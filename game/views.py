import json

from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from models import Game, Player


def get_game_context(request, game):
    """
    Returns the context we want for the client for a given game.
    """
    return render(request, 'game/game.html', {'game': game})


def game(request, game_id):
    """
    Send game context to client side.
    """
    curr_game = get_object_or_404(Game, pk=game_id)
    return get_game_context(request, curr_game)


def remove(request, game_id, player_id):
    """
    Update game of a player that lost.
    """
    
    curr_game = get_object_or_404(Game, pk=game_id)
    curr_player = get_object_or_404(Player, pk=player_id)
    curr_game.remove_player(curr_player)
    curr_game.save()
    
    return HttpResponse()


def clock(request, game_id, is_running):
    """
    Start the clock on a given game.
    """
    
    curr_game = get_object_or_404(Game, pk=game_id)
    
    if is_running:
        curr_game.start_playing()
    else:
        curr_game.calculate_blind_state()
        
    curr_game.save()
    
    return HttpResponse()


def get_time(request, game_id):
    """
    Return current time left in blind.
    """
    
    curr_game = get_object_or_404(Game, pk=game_id)
    level, time_left = curr_game.get_blind_state()
    json_data = json.dumps({'level': level, 'time': time_left})
    
    return HttpResponse(json_data, mimetype="application/json")
