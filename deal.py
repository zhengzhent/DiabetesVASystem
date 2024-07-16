import numpy as np

# 原始数据
data = np.array([0.041995525, 0.038328595, 0.035663422, 0.035557979, 0.033767252, 0.032306197])

# 归一化
data_min = data.min()
data_max = data.max()
data_normalized = (data - data_min) / (data_max - data_min)

plus = data*1000
print(data)
