from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^get_data/(?P<filename>[ \S]+)', views.get_all_json, name='get_all_json'),
]
