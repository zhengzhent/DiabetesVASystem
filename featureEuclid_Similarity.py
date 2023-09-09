import numpy as np
import pandas as pd

def load_csv(path):    #读取文件
    data_read = pd.read_csv(path,encoding='ISO-8859-1')
    list = data_read.values.tolist()
    data = np.array(list)
    print(data.shape)
    # print(data)
    return data

def Euclid_similarity(mat1,mat2):
    differ = mat1 - mat2
    # euclid_distance = np.linalg.norm(differ)
    # return euclid_distance
    dist = np.linalg.norm(differ, ord='fro')
    len1 = np.linalg.norm(mat1)
    len2 = np.linalg.norm(mat2)  # 普通模长
    denom = (len1 + len2) / 2
    similar = 1 - (dist / denom)
    return similar

test_patient = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data_Updated\modify\classes3patient.csv") #测试患者特征矩阵
# print(mat)
class1_mat = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data_Updated\modify\classes1.csv")  #第一类患者特征矩阵
# print(class1_mat)
class2_mat = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data_Updated\modify\classes2.csv")  #第二类患者特征矩阵
# print(class2_mat)
class3_mat = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data_Updated\modify\classes3.csv")  #第三类患者特诊矩阵
# print(class3_mat)

eculid_distance1 = Euclid_similarity(test_patient,class1_mat)
eculid_distance2 = Euclid_similarity(test_patient,class2_mat)
eculid_distance3 = Euclid_similarity(test_patient,class3_mat)
print(eculid_distance1)
print(eculid_distance2)
print(eculid_distance3)