import numpy as np
import pandas as pd

def load_csv(path):    #读取文件
    data_read = pd.read_csv(path,encoding='ISO-8859-1')
    list = data_read.values.tolist()
    data = np.array(list)
    print(data.shape)
    # print(data)
    return data

def matrix_kernel(X, Y, sigma):
    """
    计算矩阵X和Y之间的核矩阵（使用HSIC定义）。
    参数：
    X: 第一个输入矩阵，形状为 (m, n)
    Y: 第二个输入矩阵，形状为 (m, n)
    sigma: 核函数的宽度参数
    返回：
    K: 矩阵核矩阵，形状为 (m, m)
    """
    m, n = X.shape

    # 计算中心化矩阵
    H = np.eye(m) - np.ones((m, m)) / m
    X_centered = np.dot(np.dot(H, X), H)
    Y_centered = np.dot(np.dot(H, Y), H)

    # 计算希尔伯特-施密特独立性准则（HSIC）的核矩阵
    Kx = np.exp(-np.square(np.linalg.norm(X_centered, axis=1)) / (2.0 * sigma**2))
    Ky = np.exp(-np.square(np.linalg.norm(Y_centered, axis=1)) / (2.0 * sigma**2))
    K = np.outer(Kx, Ky)

    return K

def matrix_similarity(X, Y, sigma):
    # 计算矩阵核矩阵
    K = matrix_kernel(X, Y, sigma)

    # 计算核矩阵的Frobenius范数
    frobenius_norm = np.linalg.norm(K, 'fro')

    # 计算相似性分数
    similarity_score = frobenius_norm / (np.linalg.norm(K) * np.linalg.norm(K))

    return similarity_score

test_patient = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data\Test3_patidata.csv") #测试患者特征矩阵
# print(mat)
class1_mat = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data\class1.csv")  #第一类患者特征矩阵
# print(class1_mat)
class2_mat = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data\class2.csv")  #第二类患者特征矩阵
# print(class2_mat)
class3_mat = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data\class3.csv")  #第三类患者特诊矩阵
# print(class3_mat)

similarity1 = matrix_similarity(test_patient, class1_mat, sigma=0.1)
print(similarity1)
similarity2 = matrix_similarity(test_patient, class2_mat, sigma=0.1)
print(similarity2)
similarity3 = matrix_similarity(test_patient, class3_mat, sigma=0.1)
print(similarity3)

