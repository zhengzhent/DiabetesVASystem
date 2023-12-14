# myapp/urls.py

from django.urls import path
from . import views
from .views import train_model

urlpatterns = [
    path('', views.index, name='index'),
    path('train_model/', train_model, name='train_model'),
    # 可以添加其他路径和视图函数的映射
]
