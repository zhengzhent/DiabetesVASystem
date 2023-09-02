import numpy as np
import pandas as pd

def load_csv(path):    #读取文件
    data_read = pd.read_csv(path,encoding='ISO-8859-1')
    list = data_read.values.tolist()
    data = np.array(list)
    print(data.shape)
    # print(data)
    return data

def cos_similarity(vec1,vec2):   #计算向量余弦相似度
    simi1 = np.sum(vec1 * vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
    return simi1

test_patient = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data\Test3_patidata.csv") #测试患者特征矩阵
# print(mat)
class1_mat = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data\class1.csv")  #第一类患者特征矩阵
# print(class1_mat)
class2_mat = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data\class2.csv")  #第二类患者特征矩阵
# print(class2_mat)
class3_mat = load_csv("F:\A_MyWork\Research\MedicalVisualization_BasedonTable2Graph\FeatureRelationGraph\Data\class3.csv")  #第三类患者特诊矩阵
# print(class3_mat)
class1_mat_flattened = class1_mat.reshape(1,-1)     #第一类转化为向量
class2_mat_flattened = class2_mat.reshape(1,-1)     #第二类转化为向量
class3_mat_flattened = class3_mat.reshape(1,-1)     #第三类转化为向量

test_patient_flattened = test_patient.reshape(1,-1)  #测试患者3转化为向量


cos_simil1 = cos_similarity(test_patient_flattened,class1_mat_flattened) #与第一类的相似度
print(cos_simil1)
cos_simil2 = cos_similarity(test_patient_flattened,class2_mat_flattened) #与第二类的相似度
print(cos_simil2)
cos_simil3 = cos_similarity(test_patient_flattened,class3_mat_flattened) #与第三类的相似度
print(cos_simil3)
