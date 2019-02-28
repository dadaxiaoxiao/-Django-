from django.apps import AppConfig


class AdminuserConfig(AppConfig):

    def __init__(self):
        self.name = 'adminuser'
        self.host = '//127.0.0.1:8000'
