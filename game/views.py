import json

from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
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
