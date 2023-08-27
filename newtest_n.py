import os
import json
import torch
from torch.nn import CrossEntropyLoss
import torch.nn as nn
from networkx import draw_spring
import scipy.sparse
from bin.t2g_former import T2GFormer, Tokenizer
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
import random
from pyecharts import options as opts
from pyecharts.charts import Graph
from community import community_louvain
from networkx.algorithms.community import louvain_communities
from torch.nn.functional import cosine_similarity
# 读取csv数据
df = pd.read_csv('E:/med/newdata/modelsdata5.csv',encoding='gbk')


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
seed_everything(152)

# 获取输入特征维度
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
def matrix_cosine_sim(m1, m2):

  # 将矩阵flatten为向量
  m1_flattened = m1.reshape(1, -1)
  m2_flattened = m2.reshape(1, -1)

  # 计算Flatten向量之间的余弦相似度
  return cosine_similarity(m1_flattened, m2_flattened)
def matrix_cos_similar(v1, v2):
    # v1.shape = (n,k), v2.shape = (m,k)
    v2 = np.array(v2).T
    #step1：矩阵点乘
    dot_matrix = np.dot(v1, v2)
    #step2：v1行方向求模，v2列方向求模，结果点乘
    v1_row_norm = np.linalg.norm(v1, axis=1).reshape(-1,1)
    v2_col_norm = np.linalg.norm(v2,axis=0).reshape(1,-1)
  #  print(v1_row_norm.shape)
    norm_matrix = np.dot(v1_row_norm, v2_col_norm)
    #step3：对应位置做除法运算，相当于向量乘积/模的乘积
    res = dot_matrix / norm_matrix
    res[np.isneginf(res)] = 0
    return res
for i in range(67):
    for j in range(i+1,67):
        sim=matrix_cosine_sim(graphs[i,2], graphs[j,2])
        print(sim)
        # sim1=matrix_cos_similar(graphs[i,2].detach().numpy(), graphs[j,2].detach().numpy())
        # print(sim1)
# graphs=graphs[3,2].detach().numpy()
# print(graphs.shape)
# G = nx.DiGraph()
# nodes1 = [namelist[i+2] for i in range(54)]
# for i in range(54):
#     for j in range(54):
#             if graphs[i][j] > 0.05:
#                 G.add_edge(nodes1[i], nodes1[j], weight=graphs[i][j])
# communities = louvain_communities(G)
# com = list(louvain_communities(G))
# print(communities)
# print(len(com))
# # partition = community_louvain.best_partition(G)
# pagerank_list = nx.pagerank(G, alpha=0.85)
# print("pagerank值是：", pagerank_list)
# size = float(len(set(partition.values())))
# print(community_louvain.modularity(partition,G))
# pos = nx.spring_layout(G)
# count = 0.
# for com in set(partition.values()) :
#     count = count + 1.
#     list_nodes = [nodes for nodes in partition.keys()
#                                 if partition[nodes] == com]
#     nx.draw_networkx_nodes(G, pos, list_nodes, node_size = 20,
#                                 node_color = str(count / size))
#
#
# nx.draw_networkx_edges(G,pos, alpha=0.5)
# plt.show()
# print(partition)
# nodes = []
# for i in range(54):
#     name=namelist[i+2]
#     value=partition[name]
#     nodes.append({'name':name,'categories':value})
# links = []
# for j in range(54):
#     for k in range(54):
#         if graphs[j, k] > 0.05:
#             links.append({'source': j, 'target': k})
# data1={
#     'nodes':nodes,
#     'links':links
# }
# json_data = json.dumps(data1)
#
# with open('graph_data8.json', 'w') as f:
#   f.write(json_data)

