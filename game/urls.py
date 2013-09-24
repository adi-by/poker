from django.conf.urls import patterns, url
import views

urlpatterns = patterns('',
    url(r'^(?P<game_id>\d+)/$', views.game, name='game'),
    url(r'^(?P<game_id>\d+)/remove/(?P<player_id>\d+)/$', views.remove, 
        name='remove'),
    url(r'^(?P<game_id>\d+)/clock/$', views.clock, 
        name='clock'),
    url(r'^(?P<game_id>\d+)/get_time/$', views.get_time, name='get_time')
)
