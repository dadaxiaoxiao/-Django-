from django.db import models
from User.models import UserInfo
from django.utils import timezone

 # 创建商品种类

class Category(models.Model):
    db_table = 'shop_category'
    cid = models.AutoField(primary_key=True)
    kind = models.CharField(max_length=255)


# 商品
class Product(models.Model):
    db_table = 'shop_product'
    pid = models.AutoField(primary_key=True)           # id

    category = models.ForeignKey(Category, related_name="category_product", on_delete=models.CASCADE)  #
    pdname = models.CharField(max_length=128)          # 商品名字
    pdprice = models.FloatField()                      # 价格
    discount = models.FloatField()                     # 折扣
    pdImage = models.TextField()                       # 图片 url
    pdInfo = models.TextField()                        # 介绍


#购物车
class Cart(models.Model):
    db_table = 'shop_cart'
    cid = models.AutoField(primary_key=True)          # id
    userinfo = models.ForeignKey(UserInfo,related_name='userinfo_cat',on_delete=models.CASCADE)  # 外键 用户
    product = models.ForeignKey(Product,related_name='product_cat',on_delete=models.CASCADE)     # 外键 商品
    pnum = models.IntegerField()                         # 数量
    sumprice = models.CharField(max_length=64)           # 总价格
    #时间
    time = models.DateField(auto_now_add=True) # 创造时间


class PayCart(models.Model):
    db_table = 'shoppaycart'
    id = models.AutoField(primary_key=True)          # id
    cart = models.ForeignKey(Cart,related_name='carttopay',on_delete=models.CASCADE)  # 外键 用户

# order
class myorder(models.Model):
    order_id = models.AutoField(primary_key=True)  # 订单id
    ordernum = models.CharField(max_length=32)  # 订单编号
    userinfo = models.ForeignKey(UserInfo, related_name='userinfo_order', on_delete=models.CASCADE)  # 外键
    product = models.ForeignKey(Product, related_name='product_order', on_delete=models.CASCADE)  # 外键 商品
    allprice = models.FloatField()  # 商品总价
    allpnum = models.IntegerField()  # 总数量
    paydate = models.DateTimeField  # 日期
    address = models.CharField(max_length=255)  # 收货地址

