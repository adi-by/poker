from django.conf.urls import patterns, url
import views

urlpatterns = patterns('',
    url(r'^(?P<game_id>\d+)/$', views.game, name='game'),
    url(r'^(?P<game_id>\d+)/remove/(?P<player_id>\d+)/$', views.remove, 
        name='remove'),
    url(r'^(?P<game_id>\d+)/start/$', views.start, name='start'),
    url(r'^(?P<game_id>\d+)/stop/$', views.stop, name='stop')
    url(r'^(?P<game_id>\d+)/get_time/$', views.get_time, name='get_time')
)
