from django.urls import path,re_path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('register_exist/', views.register_exist, name='register_exist'),  # 判断 用户名是否存在
    path('login/',views.login, name='login'),
    path('logout/',views.logout, name='logout'),
    path('address/',views.editaddress,name='adress'),
    path('getaddress/', views.getaddress),
    path('editpwd/',views.editpassword,name='eidtpwd'),
    path('personalinfo/',views.personalinfo,name='personalinfo'),




]
app_name = 'bUser '