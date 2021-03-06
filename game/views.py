import json

from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django_sse.redisqueue import send_event

from models import Game, Player


def game(request, game_id):
    """
    Send game context to client side.
    """
    curr_game = get_object_or_404(Game, pk=game_id)
    return render(request, 'game/game.html', {'game': curr_game})


def remove(request, game_id, player_id):
    """
    Update game of a player that lost.
    """
    
    curr_game = get_object_or_404(Game, pk=game_id)
    curr_player = get_object_or_404(Player, pk=player_id)
    curr_game.remove_player(curr_player)
    curr_game.save()
    
    # Sending event
    players_left = curr_game.get_players()
    player_pks = [player.pk for player in players_left]
    json_data = json.dumps({'players': player_pks})
    send_event("player_update", json_data, channel='game{}'.format(game_id))
    
    return HttpResponse()


def clock(request, game_id):
    """
    Start the clock on a given game.
    """
    
    curr_game = get_object_or_404(Game, pk=game_id)
    is_running_str = request.GET.get('is_running', '')
    is_running = json.loads(is_running_str)
    if is_running:
        curr_game.start_playing()
    else:
        curr_game.pause_playing()
        
    curr_game.save()
    
    # Sending event
    level, time_left = curr_game.get_blind_state()
    json_data = json.dumps({'is_running': is_running, 'level': level, 
                            'time': time_left})
    send_event("clock_update", json_data, channel='game{}'.format(game_id))
    
    return HttpResponse()


def get_time(request, game_id):
    """
    Return current time left in blind.
    """
    
    curr_game = get_object_or_404(Game, pk=game_id)
    level, time_left = curr_game.get_blind_state()
    json_data = json.dumps({'level': level, 'time': time_left, 
                            'is_running': curr_game.is_running})
    
    return HttpResponse(json_data, mimetype="application/json")
