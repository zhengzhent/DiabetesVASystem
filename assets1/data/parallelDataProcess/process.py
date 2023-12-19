import csv
import json
import pandas as pd

# 读取CSV文件
csv_file_path = 'assets1\\data\\parallelDataProcess\\data\\traits_processed.csv'
df = pd.read_csv(csv_file_path,encoding='gbk')

print(df.head)

# 选择需要的列
selected_columns = ['RBC(1012/L)','CREA(umol/L)','Age','LDL--C','WBC(×109/L)','PPBP-2h(mmol/L)','PPInsulin-2h(pmol/l)','Class'] 

# 创建一个包含所选列的新DataFrame
selected_df = df[selected_columns]

# 将DataFrame转换为JSON格式
json_data = selected_df.to_json(orient='records')

# 打印JSON数据
# print(json_data)

with open('assets1\data\output.json', 'w',encoding='ansi') as json_file:
    json_file.write(json_data)
