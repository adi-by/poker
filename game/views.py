from django.shortcuts import render, get_object_or_404
from models import Game

def get_game_context(request, game):
    """
    Returns the context we want for the client for a given game.
    """
    context = {'blinds': game.blind_schema.blind_set.all().order_by('level')}
    return render(request, 'game/game.html', context)

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
    curr_game.remove_player(player_id)
    
    return get_game_context(request, curr_game)
