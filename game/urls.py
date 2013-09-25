from django.conf.urls import patterns, url
from django_sse.redisqueue import RedisQueueView
import views

class DynamicRedisQueueView(RedisQueueView):
    def get_redis_channel(self):
        return self.kwargs['game_id'] or self.redis_channel
    
urlpatterns = patterns('',
    url(r'^(?P<game_id>\d+)/$', views.game, name='game'),
    url(r'^(?P<game_id>\d+)/remove/(?P<player_id>\d+)/$', views.remove, 
        name='remove'),
    url(r'^(?P<game_id>\d+)/clock/$', views.clock, 
        name='clock'),
    url(r'^(?P<game_id>\d+)/get_time/$', views.get_time, name='get_time'),
    url(r'^(?P<game_id>\d+)data_stream/$', 
        DynamicRedisQueueView.as_view(redis_channel="data"), 
        name="data_stream"),
)
