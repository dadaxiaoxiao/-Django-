class UserMethod:
    def __init__(self, request):
        self.request = request
        self.uinfo = self.getUserInfo()  # 运行判断

    # 判断是否登录
    def getUserInfo(self):
        if 'user' in self.request.session:
            return self.request.session['user']
        else:
            return {'islogin': False}