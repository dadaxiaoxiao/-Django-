from django.urls import path,re_path
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),        # 主页
    path('detail/', views.prodetail, name='detail'),  # 详细页面
    path('addtocart/', views.addtocart, name='addtocart'), # 添加到购物车
    path('getcartnum1/', views.getcartnum, name='getcartnum'),  # 添加到购物车
    path('showcart/',views.showCart,name='showcart'), # 展示购物车
    path('addgoods1/',views.add_goods,name='addgoods'),
    path('subgoods1/',views.sub_goods,name='subgoods'),
    path('deletcart/',views.delCart,name='deletcart'),  # 删除购物车的商品
    path('cash_pay/',views.cash_payment,name='cash_pay'),  # 支付

]
app_name = 'bShop'