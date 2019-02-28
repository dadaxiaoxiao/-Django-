from django.urls import path,re_path
from . import views

urlpatterns = [
    path('login/', views.adminlogin, name='adminlogin'),
    path('logout/', views.logout, name='admin.logout'),
    path('index/', views.admin_index, name='admin_index'),
    path('imagefile/', views.imagemanage, name='imagemanage'),
    path('imageupload/', views.imageupload, name='imageupload'),
    path('categorym/', views.categorym, name='categorym'),
    path('newfcategory/', views.newfcategory, name='newfcategory'),
    path('categorydelete/', views.categorydelete, name='categorydelete'),
    path('addproduct/', views.addproduct, name='addproduct'),
    path('productm/newproduct/', views.newproduct, name='newproduct'),
    path('product_list/',views.admin_product_list,name='product_list'),
    path('prodelete/', views.prodelete, name='prodelete'),
    path('modproduct/', views.modproduct, name='modproduct'),
    path('modproductdata/', views.modproductdata, name='modproductdata'),




]
app_name = 'Admin'