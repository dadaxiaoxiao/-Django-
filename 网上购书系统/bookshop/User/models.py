from django.db import models
from werkzeug.security import generate_password_hash, check_password_hash



class UserInfo(models.Model):
    db_table = 'bshop_user'
    uid = models.AutoField(primary_key=True,unique=True)            # id
    username = models.CharField(max_length=30)                      # 用户名
    email = models.EmailField(max_length=64,unique=True)            # email
    phone = models.CharField(max_length=15, default='')             # phone
    password_hash = models.TextField()                              # password

    @property
    def password(self):
        raise AttributeError('Can not read password！')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)


class Address(models.Model):

    userinfo = models.ForeignKey(UserInfo, related_name='userinfo_address', on_delete=models.CASCADE)
    uid = models.AutoField(primary_key=True)
    province = models.CharField(max_length=30)    # 省份
    city = models.CharField(max_length=30)        # 市区
    district = models.CharField(max_length=30)    # 县区
    detail = models.CharField(max_length=128)     # 详细地区
    get_name = models.CharField(max_length=128)
    get_phone = models.CharField(max_length=128)
    get_code = models.CharField(max_length=128)

    def getFullAddress(self):
        return self.province + ' ' + self.city + ' ' + self.district + ' ' + self.detail + '(' + self.get_name + '收)' + ' ' + self.get_phone

# class ORDER1(models.Model):
#
#     oid = models.AutoField(primary_key=True)        #订单id
#     ordernum = models.CharField(max_length=32)      #订单编号
#     userinfo = models.ForeignKey(UserInfo, related_name='userinfo_order', on_delete=models.CASCADE)  # 外键
#     product = models.ForeignKey(Product, related_name='product_order', on_delete=models.CASCADE)  # 外键 商品
#     allprice = models.FloatField()                  #商品总价
#     allpnum = models.IntegerField()                 # 总数量
#     paydate = models.DateTimeField               # 日期
#     address = models.CharField(max_length=255)    #收货地址
