import os
import json
import torch
import torch.nn as nn
from torch.nn import CrossEntropyLoss
from torch.utils.data import DataLoader, TensorDataset
import torch.nn.functional as F
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import random

from models.bin import T2GFormer # Assuming these are custom modules
from sklearn.metrics import roc_curve, auc
from sklearn.preprocessing import label_binarize

def seed_everything(seed=42):
    '''
    Sets the seed of the entire notebook so results are the same every time we run.
    This is for REPRODUCIBILITY.
    '''
    random.seed(seed)
    # Set a fixed value for the hash seed
    os.environ['PYTHONHASHSEED'] = str(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)

    if torch.cuda.is_available():
        torch.cuda.manual_seed(seed)
        torch.cuda.manual_seed_all(seed)
        # When running on the CuDNN backend, two further options must be set
        torch.backends.cudnn.deterministic = True
        torch.backends.cudnn.benchmark = False

def train_t2gformer_model(n_layers, d_token, n_heads, d_ffn_factor, attention_dropout, ffn_dropout,
                           residual_dropout, activation, prenormalization, initialization,
                           kv_compression, kv_compression_sharing, d_out,token_bias):
    seed_everything(88)

    # Load and preprocess data
    df = pd.read_csv('E:/med/new_data/models(top15).csv', encoding='gbk')
    num_scaler = StandardScaler()
    df.iloc[:, 2:14] = num_scaler.fit_transform(df.iloc[:, 2:14])

    X = df.iloc[:, 2:17]
    y = df['程度分级'] - 1
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=88)

    x_num_train = torch.tensor(X_train.iloc[:, 0:12].values, dtype=torch.float32)
    x_cat_train = torch.tensor(X_train.iloc[:, 12:15].values, dtype=torch.long)
    y_train = torch.tensor(y_train.values)

    # Define the model
    model = T2GFormer(
        n_layers=n_layers,
        d_token=d_token,
        n_heads=n_heads,
        d_ffn_factor=d_ffn_factor,
        attention_dropout=attention_dropout,
        ffn_dropout=ffn_dropout,
        residual_dropout=residual_dropout,
        activation=activation,
        prenormalization=prenormalization,
        initialization=initialization,
        kv_compression=kv_compression,
        kv_compression_sharing=kv_compression_sharing,
        d_out=d_out,
        d_numerical=12,
        categories=[2,2,2],
        token_bias=token_bias
    )

    optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)
    criterion = CrossEntropyLoss()
    batch_size = 3

    # Create DataLoader for training data
    train_loader = DataLoader(TensorDataset(x_num_train, x_cat_train, y_train), batch_size=batch_size, shuffle=True)

    # Train the model
    for epoch in range(20):
        for i, (x_num_batch, x_cat_batch, y_batch) in enumerate(train_loader):
            optimizer.zero_grad()
            y_pred = model(x_num_batch, x_cat_batch)
            loss = criterion(y_pred, y_batch)
            loss.backward()
            optimizer.step()

        print(f'Epoch {epoch + 1} loss: {loss.item():.4f}')

    return 'Model training completed!'
