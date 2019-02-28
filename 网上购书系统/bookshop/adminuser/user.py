from .models import User


class UserMethod:
    def __init__(self, request):
        self.request = request
        self.uinfo = self.getUserInfo()

    def getUserInfo(self):
        if 'adminuser' in self.request.session:
            thisuser = User.objects.filter(username=self.request.session['adminuser']['username']).first()
            if thisuser is None:
                return {'islogin': False}
            else:
                return self.request.session['adminuser']
        else:
            return {'islogin': False}