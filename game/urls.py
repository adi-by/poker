from django.conf.urls import patterns, url
import views

urlpatterns = patterns('',
    url(r'^(?P<game_id>\d+)/$', views.game, name='game')
)
