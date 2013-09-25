from django.contrib import admin
from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from game.views import main
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^game/', include('game.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', main, name='index'),
)

urlpatterns += staticfiles_urlpatterns()
