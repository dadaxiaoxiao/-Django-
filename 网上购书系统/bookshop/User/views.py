from django.shortcuts import render
from .models import UserInfo,Address
from .user import UserMethod
from django.db.models import Q
from django.http import  HttpResponseRedirect,JsonResponse
from functools import wraps

# Create your views here.






def login_required(f):
    @wraps(f)
    def decorated_function(request, *args, **kwargs):

        thisuser = UserMethod(request)

        userinfo = thisuser.getUserInfo()
        if userinfo['islogin'] is not True:
            return HttpResponseRedirect('/user/login/')
        return f(request, *args, **kwargs)

    return decorated_function






def register(request):
    if request.method == "POST":
        username = request.POST.get('txt_username')
        password = request.POST.get('txt_password')
        email = request.POST.get('txt_email')
        request.session["user"] = {'islogin': True, 'username': username, 'email': email}
        newuser = UserInfo(username=username, email=email,password=password)
        newuser.save()
        return HttpResponseRedirect('/user/login')
    else:
        return render(request, 'bshop_user/register.html')  # 渲染

def register_exist(request):
    username = request.GET.get('uname')
    count = UserInfo.objects.filter(username=username).count()
    return JsonResponse({'count':count})

def login(request):
    if request.method == "POST":
        username = request.POST.get('txtUsername')
        password = request.POST.get('txtPassword')
        thisuser=UserInfo.objects.filter(Q(username=username))    # 查找用户
        if thisuser.count()== 0:             # 用户不存在
            context = {'error_name': 1, 'error_pwd': 0, 'username': username, 'password': password}
            return render(request,'bshop_user/login.html',context)
        else:
            if thisuser.first().verify_password(password):
                request.session["user"] = {'islogin': True, 'username': thisuser.first().username,
                                           'email': thisuser.first().email,
                                           'phone': thisuser.first().phone}
                return HttpResponseRedirect("/shop/index/")
            else:                            # 密码不对
                context = {'error_name': 0, 'error_pwd': 1 ,'username': username ,'password':password}
                return render(request, 'bshop_user/login.html', context)
    else:
        this_user = UserMethod(request)    # 从session 获取用户
        userinfo = this_user.getUserInfo()
        if userinfo['islogin']:
            return HttpResponseRedirect("/shop/index/")
        else:
            return render(request,'bshop_user/login.html')

def logout(request):
    thisuser = UserMethod(request)
    userinfo = thisuser.getUserInfo()
    if userinfo['islogin']:
        request.session.pop("user")    # 清空session
        return HttpResponseRedirect("/shop/index/")

@login_required
def personalinfo(request):
    # get this user from session
    thisuser = UserMethod(request)
    # get user info, check if it's logined
    userinfo = thisuser.getUserInfo()
    thisuser = UserInfo.objects.filter(username=userinfo['username']).first()
    context={'username' : thisuser.username,'email': thisuser.email, 'userinfo': userinfo,'thisuser': thisuser}
    return render(request, "bshop_user/personalinfo.html", context)

@login_required
def editpassword(request):
    thisuser = UserMethod(request)
    user_info = thisuser.getUserInfo()
    thisuser = UserInfo.objects.filter(username=user_info['username']).first()
    if request.method == "POST":
        oldpassword = request.POST.get('oldpassword')
        newpassword = request.POST.get('newpassword')
        if thisuser.verify_password(oldpassword):
            thisuser.password = newpassword
            thisuser.save()
            return HttpResponseRedirect("/shop/index/")
        else:  # 密码不对
            context = {'error_pwd': 1, 'oldpassword': oldpassword, 'newpassword': newpassword ,'userinfo': user_info }
            return render(request, 'bshop_user/editpwd.html', context)
    else:
        context = {'error_pwd': 0, 'oldpassword': '', 'newpassword': '','userinfo': user_info}
        return render(request, 'bshop_user/editpwd.html',context)

@login_required
def editaddress(request):

    thisuser = UserMethod(request)
    user_info = thisuser.getUserInfo()
    userinfo1 = UserInfo.objects.filter(username=user_info['username'])
    userinfo1= userinfo1.first()
    this_address = Address.objects.filter(userinfo_id=userinfo1.uid)

    if this_address.count() == 0:
        addressinfo = {
            'userinfo': user_info,
            'address': {
                'curaddress': '请设置收货地址',
                'province': '广东省',
                'city': '广州市',
                'district': '天河区',
                'detail': '',
                'getname': '',
                'getphone': '',
                'getcode': ''
            }
        }
        if request.method == 'POST':
            province = request.POST.get('province')
            city = request.POST.get('city')
            district = request.POST.get('district')
            adddetail = request.POST.get('adddetail')
            getphone = request.POST.get('getphone')
            getcode = request.POST.get('getcode')
            getname =request.POST.get('getname')
            newaddress = Address( province=province, city=city, district=district,
                                 detail=adddetail, get_name=getname, get_phone=getphone, get_code=getcode,userinfo_id=userinfo1.uid)
            newaddress.save()
            return HttpResponseRedirect("/user/address/")
    else:
        this_address = this_address.first()
        addressinfo = {
            'userinfo': user_info,
            'address': {
                'curaddress': this_address.getFullAddress(),
                'province': this_address.province,
                'city': this_address.city,
                'district': this_address.district,
                'detail': this_address.detail,
                'getname': this_address.get_name,
                'getphone': this_address.get_phone,
                'getcode': this_address.get_code,
            }
        }
        if request.method == 'POST':
            province = request.POST.get('province')
            city = request.POST.get('city')
            district = request.POST.get('district')
            adddetail = request.POST.get('adddetail')
            getname = request.POST.get('getname')
            getphone = request.POST.get('getphone')
            getcode = request.POST.get('getcode')
            this_address.province = province
            this_address.city = city
            this_address.district = district
            this_address.detail = adddetail
            this_address.get_name = getname
            this_address.get_phone = getphone
            this_address.get_code = getcode
            this_address.save()
            return HttpResponseRedirect("/user/address/")
    return render(request,"bshop_user/address.html",addressinfo)

@login_required
def getaddress(request):

    thisuser = UserMethod(request)
    user_info = thisuser.getUserInfo()
    userinfo1 = UserInfo.objects.filter(username=user_info['username'])
    userinfo1 = userinfo1.first()
    this_address = Address.objects.filter(userinfo_id=userinfo1.uid)

    if this_address.count() == 0:
        return JsonResponse({
            'recode': 0,
            'remsg': '无地址',
            'data': {
                'error': '',
                'address': {
                    'province': '广东省',
                    'city': '广州市',
                    'district': '天河区',
                    'detail': ''
                }
            }
        })
    else:
        thisaddress = this_address.first()
        return JsonResponse({
            'recode': 1,
            'remsg': '获取地址成功',
            'data': {
                'error': '',
                'address': {
                    'province': thisaddress.province,
                    'city': thisaddress.city,
                    'district': thisaddress.district,
                    'detail': thisaddress.detail
                }
            }
        })


