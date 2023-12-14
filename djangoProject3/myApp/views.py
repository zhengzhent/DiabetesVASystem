from django.shortcuts import render
from django.http import JsonResponse
from models.train_models import train_t2gformer_model
import json
import re
import ast
# Create your views here.

def index(request):
    return render(request, 'index1.html')


def extract_params(func_str):
    print('Received function string:', func_str)
    match = re.match(r".*?\((.*?)\)", func_str, re.DOTALL)

    if match:
        params_str = match.group(1)
        # 修复对包含列表的参数进行分割的问题
        params_list = re.split(r',(?![^\[\]]*\])', params_str)
        params_dict = {}

        for param in params_list:
            key, value = param.split('=')

            try:
                params_dict[key.strip()] = ast.literal_eval(value.strip())
            except Exception as e:
                print(f'Error evaluating parameter {key}: {e}')
                # 如果有异常，可以选择在这里采取适当的措施，例如使用字符串值而不是字面值。
        return params_dict
    else:
        return None


def train_model(request):
    if request.method == 'POST':
        try:
            # 获取 POST 请求中的参数
            data = json.loads(request.body.decode('utf-8'))
            t2gformer_parameters = data.get('parameters')
            print(t2gformer_parameters)
            # 解析参数
            parameters_dict = extract_params(t2gformer_parameters)
            print(parameters_dict)
            # 训练模型
            result = train_t2gformer_model(**parameters_dict)

            # 返回 JSON 响应
            return JsonResponse({'result': result})
        except Exception as e:
            print('Error in train_model:', e)
            return JsonResponse({'error': str(e)}, status=500)
    else:
        # 处理 GET 请求
        return render(request, 'index1.html')