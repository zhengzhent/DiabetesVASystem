import os
import json
from torch.nn import CrossEntropyLoss
import torch
import torch.nn as nn
from bin.t2g_former import T2GFormer, Tokenizer
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
import random
from pyecharts import options as opts
from pyecharts.charts import Graph
from pyecharts.charts import Polar
import torch.nn.functional as F
from torch_geometric.nn import GCNConv
from torch_geometric.utils import to_networkx
from torch_geometric.data import Data
from torch.nn.functional import cosine_similarity
from sklearn.model_selection import train_test_split
import shap
from sklearn.preprocessing import StandardScaler
from captum.attr import IntegratedGradients

df = pd.read_csv('E:/med/newdata/modelsdata5.csv',encoding='gbk')
num_scaler = StandardScaler()
df.iloc[:,2:13]=num_scaler.fit_transform(df.iloc[:,2:13])
print(df)
x = torch.from_numpy(np.array(df.iloc[:, 2:-1])).float()
y = torch.from_numpy(np.array(df.iloc[:, -1])).long() - 1
print(x)
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
seed_everything(88)

namelist=df.columns
print(namelist)
d_numerical = 11 # 数值特征列数
categories = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,3] # 分类特征的类别数
d_token = 272
# 定义模型
model = T2GFormer(
    n_layers=3,
    d_token=d_token,
    n_heads=8,
    d_ffn_factor=4,
    attention_dropout=0.1,
    ffn_dropout=0.1462394754853018,
    residual_dropout=0,
    activation='reglu',
    prenormalization=True,
    initialization='kaiming',
    kv_compression=None,
    kv_compression_sharing=None,
    d_out=3,
    d_numerical=d_numerical,
    categories=categories,
    token_bias=True
)

tokenizer = Tokenizer(d_numerical, categories, d_token, True)
num_cols = df.iloc[:, 2:13].astype(np.float32)
x_num = torch.tensor(num_cols.values, dtype=torch.float32)  #数值列变量
cat_cols=df.iloc[:, 13:55].astype(np.int64)
x_cat = torch.tensor(df.iloc[:, 13:55].values, dtype=torch.long)  #分类列变量

pred,graphs=model(x_num,x_cat,return_fr=True)
graphs=graphs[-2]
print(graphs)
def matrix_cosine_sim(m1, m2):

  # 将矩阵flatten为向量
  m1_flattened = m1.reshape(1, -1)
  m2_flattened = m2.reshape(1, -1)

  # 计算Flatten向量之间的余弦相似度
  return cosine_similarity(m1_flattened, m2_flattened)
edge_index = []
for i in range(67):
    for j in range(i+1,67):
        sim=matrix_cosine_sim(graphs[i,2], graphs[j,2])
        if sim>0.85:
            edge_index.append([i,j])

data=Data(x=x,edge_index=torch.tensor(edge_index).t().contiguous(),y=y)
print(data)

idx = torch.arange(data.x.size(0))
train_idx, test_idx = train_test_split(idx, test_size=0.2,stratify=data.y)

data.train_mask = torch.zeros(data.x.size(0), dtype=torch.bool)
data.train_mask[train_idx] = True

data.test_mask = torch.zeros(data.x.size(0), dtype=torch.bool)
data.test_mask[test_idx] = True

class GCN(torch.nn.Module):
    def __init__(self):
        super(GCN, self).__init__()
        self.conv1 = GCNConv(x.size(1), 64)
        self.conv2 = GCNConv(64, 32)
        self.conv3 = GCNConv(32, 32)
        self.linear = nn.Linear(32, 3)  # 添加线性层

    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = F.dropout(x, p=0.5, training=self.training)
        x = self.conv2(x, edge_index)
        x = F.relu(x)
        x = F.dropout(x, p=0.5, training=self.training)
        x = self.conv3(x, edge_index)
        x = self.linear(x)  # 使用线性层进行预测
        return F.log_softmax(x, dim=1)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = GCN().to(device)
print(model)
print(data.y)
loss_min=100000
# 训练
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion=nn.CrossEntropyLoss()
model.train()
for epoch in range(1000):
    optimizer.zero_grad()
    out = model(data.x, data.edge_index)
    loss = criterion(out[idx], data.y[idx])
    if loss<loss_min:
        loss_min=loss
    loss.backward()
    optimizer.step()
model.eval()
_, pred = model(data.x, data.edge_index).max(dim=1)
print(pred)
correct = float (pred[data.test_mask].eq(data.y[data.test_mask]).sum().item())
acc = correct / data.test_mask.sum().item()
print('Accuracy: {}'.format(acc))

correct = float (pred[data.train_mask].eq(data.y[data.train_mask]).sum().item())
acc = correct / data.train_mask.sum().item()
print('Accuracy: {}'.format(acc))

print(loss_min)

# explainer = shap.DeepExplainer(model(data.x, data.edge_index), (data.x, data.edge_index))
# shap_values = explainer.shap_values(data.x)
forward_func = lambda x: model(x, data.edge_index)
integrated_gradients = IntegratedGradients(forward_func)
attributions = integrated_gradients.attribute(data.x, target=pred, n_steps=50)
print(attributions.shape)
attr_np = attributions.detach().cpu().numpy()
plt.figure()
plt.imshow(attr_np, cmap="RdBu", vmin=-1, vmax=1)
plt.colorbar()
plt.axis('off')
plt.show()
print(data.x.shape[0])
for i in range(data.x.shape[0]):
    attr = attributions[i].detach().numpy()

    plt.figure()
    plt.bar(range(len(attr)), attr)
    plt.xlabel('Feature Index')
    plt.ylabel('Importance')
    plt.title('Sample {}'.format(i))
    plt.show()