import pandas as pd

# 假设数据已从图片中读取并存储在一个CSV文件中
file_path = 'D:\\DiabetesVASystem\\assets1\\staticdata\\Feature_Bar.csv'  # 替换为实际的文件路径

# 读取数据
df = pd.read_csv(file_path)

# 要进行归一化的特征列
columns_to_normalize = ['Importance']

# 定义归一化函数
def min_max_normalize(series, min_val=0, max_val=1):
    return (series - series.min()) / (series.max() - series.min()) * (max_val - min_val) + min_val

# 对每一列进行归一化
for col in columns_to_normalize:
    df[col] = min_max_normalize(df[col])

# 保存归一化后的数据到新文件
output_file_path = 'D:\\DiabetesVASystem\\assets1\\staticdata\\normalized_FeatureBar.csv'  # 替换为你想要保存的文件路径
df.to_csv(output_file_path, index=False)

print("归一化后的数据已保存到", output_file_path)
