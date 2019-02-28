from django.shortcuts import render
from User.user import UserMethod
from.models import Product,Category,Cart,PayCart
from User.views import login_required
from User.models import UserInfo
from django.http import  HttpResponseRedirect,JsonResponse
from User.models import Address

# Create your views here.

def index(request):
    # get this user from session
    thisuser = UserMethod(request)
    # get user info, check if it's logined
    userinfo = thisuser.getUserInfo()
    # 学习书刊
    book1s = Product.objects.filter(category_id=1)[0:4]
    # 小说书刊
    book2s = Product.objects.filter(category_id=2)[0:4]
    # 时尚杂志
    book3s = Product.objects.filter(category_id=3)[0:4]
    # 儿童书刊
    book4s = Product.objects.filter(category_id=4)[0:4]
    # 明星传记
    book5s = Product.objects.filter(category_id=5)[0:4]
    # 励志书刊
    book6s = Product.objects.filter(category_id=6)[0:4]
    data = {
        'userinfo': userinfo,
        'book1s':book1s,
        'book2s': book2s,
        'book3s': book3s,
        'book4s': book4s,
        'book5s': book5s,
        'book6s': book6s,
    }
    return render(request, "bshop/index.html",data)

# 商品列表
def prodetail(request):
    thisuser = UserMethod(request)
    userinfo = thisuser.getUserInfo()
    pid = request.GET.get('pid')
    product=Product.objects.filter(pid=pid).first()  #产品
    category=Category.objects.filter(cid=product.category_id).first()
    imglist = product.pdImage.split('##')  # 商品图片地址
    price=(float(product.pdprice)*float(product.discount)/10)  #折扣价
    books = Product.objects.filter(category_id=product.category_id)[0:3]
    data={
        'userinfo':userinfo,
        'product':product,
        'category':category,
        'imglist':imglist,
        'price':price,
        'books':books,
    }
    return render(request, "bshop/detail1.html", data)

# Add to cart
@login_required
def addtocart(request):   #添加至购物车

    thisuser = UserMethod(request)
    userinfo = thisuser.getUserInfo()
    thisuser = UserInfo.objects.filter(username=userinfo['username']).first()
    if request.method == "POST":
        product_pid = request.POST.get('product_pid')    # 获取pid
        userinfo_id = thisuser.uid              # 用户id
        pnum = request.POST.get('pnum')          # 数量
        sumprice = request.POST.get('sumprice')
        thiscart = Cart.objects.filter(product_id=product_pid,  userinfo_id= userinfo_id).all()
        if len(thiscart) == 0:
            newcart = Cart(product_id=product_pid,  userinfo_id= userinfo_id,pnum=pnum,sumprice=sumprice)
            newcart.save()
        # else:
        #     thiscart[0].pnum = thiscart[0].pnum + pnum # 更改数量
        #     thisuser[0].sumprice =round(float(thisuser[0].sumprice)  + float(sumprice) ) # 更改价格
        #     thiscart[0].save()
        allcart = Cart.objects.filter(userinfo_id= userinfo_id).count()    # 购物车数量
        return JsonResponse({
            'recode': 1,
            'remsg': '添加成功',
            'data': {
                'error': '',
                'allcart': allcart
            }
        })
    else:
        return JsonResponse({'recode': 0, 'remsg': '非法请求', 'data': {'error': '非法请求'}})

# 获取购物车数目
@login_required
def getcartnum(request):
    if request.method == "GET":
        thisuser = UserMethod(request)
        userinfo = thisuser.getUserInfo()
        thisuser = UserInfo.objects.filter(username=userinfo['username']).first()
        userinfo_id = thisuser.uid  # 用户id
        allcart = Cart.objects.filter(userinfo_id=userinfo_id).count()  # 购物车数量
        return JsonResponse({'recode': 1, 'remsg': '获取成功', 'data': {'error': '', 'allcart': allcart}})

#  展示购物车
@login_required
def showCart(request):
    thisuser = UserMethod(request)
    userinfo = thisuser.getUserInfo()
    thisuser = UserInfo.objects.filter(username=userinfo['username']).first()
    userinfo_id = thisuser.uid  # 用户id
    allcart = Cart.objects.filter(userinfo_id=userinfo_id).all()
    allcartnum = Cart.objects.filter(userinfo_id=userinfo_id).count()  # 购物车数量

    data={
        'userinfo': userinfo,
        'allcartnum': allcartnum,
        'allcart': allcart ,


    }
    return render(request,'bshop/ShowCart.html',data)

# 增加商品
@login_required
def add_goods(request):
    if request.method == 'POST':
        thisuser = UserMethod(request)
        userinfo = thisuser.getUserInfo()
        thisuser = UserInfo.objects.filter(username=userinfo['username']).first()
        userinfo_id = thisuser.uid  # 用户id
        product_pid = request.POST.get('product_pid')
        data = {}
        cart = Cart.objects.filter(userinfo_id=userinfo_id,product_id=product_pid).first()
        if cart:
            cart.sumprice = round (float(cart.sumprice) / cart.pnum * (cart.pnum + 1),2)
            cart.pnum += 1
            cart.save()

            data['msg'] = '请求成功'
            return JsonResponse(data)

#减少商品
@login_required
def sub_goods(request):
    if request.method == 'POST':
        thisuser = UserMethod(request)
        userinfo = thisuser.getUserInfo()
        thisuser = UserInfo.objects.filter(username=userinfo['username']).first()
        userinfo_id = thisuser.uid  # 用户id
        product_pid = request.POST.get('product_pid')
        data = {}
        cart = Cart.objects.filter(userinfo_id=userinfo_id, product_id=product_pid).first()
        if cart:
            if cart.pnum==1:
                data['msg'] = '亲! 至少买一个吧'
            else:
                cart.sumprice = round (float(cart.sumprice) / cart.pnum * (cart.pnum - 1),2)
                cart.pnum -= 1
                cart.save()
                data['msg'] = '请求成功'
                return JsonResponse(data)
        else:
            data['msg'] = '请添加商品'
            return JsonResponse(data)

#  减少数目
@login_required
def delCart(request):
    if request.method == 'GET':
        thisuser = UserMethod(request)
        userinfo = thisuser.getUserInfo()
        thisuser = UserInfo.objects.filter(username=userinfo['username']).first()
        userinfo_id = thisuser.uid  # 用户id
        product_pid = request.GET.get('pid')
        Cart.objects.filter(userinfo_id=userinfo_id, product_id=product_pid).delete()
        return HttpResponseRedirect("/shop/showcart/")

# 支付
@login_required
def cash_payment(request):
    if request.method == 'POST':
        allcartpay = PayCart.objects.filter().all()
        if allcartpay != '':
            PayCart.objects.filter().all().delete()
        thisuser = UserMethod(request)
        userinfo = thisuser.getUserInfo()
        thisuser = UserInfo.objects.filter(username=userinfo['username']).first()
        userinfo_id = thisuser.uid  # 用户id
        cartlist = request.POST.get("cartlist")  #支付的购物车id
        cartlist = cartlist.split('#')
        for list in cartlist:
            if list !='':
                list= int(list)
                newcart= Cart.objects.filter(cid=list).first()
                cartpay=PayCart(cart_id=newcart.cid)
                cartpay.save()
        allcart = Cart.objects.filter(userinfo_id=userinfo_id).all()
        this_address = Address.objects.filter(userinfo_id=userinfo_id).first()
        Clist= PayCart.objects.filter().all()

        data = {
            'userinfo': userinfo,
            'allcart': allcart,
            'curaddress': this_address.getFullAddress(),
            'Clists':Clist,
        }
        return render(request, 'bshop/pay.html', data)