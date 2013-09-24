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
    
    return HttpResponse()
