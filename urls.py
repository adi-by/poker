from django.http import HttpResponseRedirect
from django.contrib import admin
from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^game/', include('game.urls')),
    url(r'^main/', include('main.urls')),
    url(r'^admin/', include(admin.site.urls)),
     (r'^$', lambda x: HttpResponseRedirect('/main/')),
)

urlpatterns += staticfiles_urlpatterns()
