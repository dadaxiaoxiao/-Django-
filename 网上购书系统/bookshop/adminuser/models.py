from django.db import models
from werkzeug.security import generate_password_hash, check_password_hash

class User(models.Model):
    db_table = 'adminuser_user'

    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30)
    password_hash = models.TextField()
    # 管理员用户 0 ，普通用户 1
    root = models.IntegerField()

    @property
    def password(self):
        raise AttributeError('Can not read password！')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

class ImageRecord(models.Model):
    db_table = 'adminuser_imagerd'
    iid = models.AutoField(primary_key=True)
    url = models.TextField()
    addtime = models.IntegerField()

