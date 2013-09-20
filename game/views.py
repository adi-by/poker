from django.shortcuts import render, get_object_or_404
from models import Game

def game(request, game_id):
    curr_game = get_object_or_404(Game, pk=game_id)
    context = {'blinds': curr_game.blind_schema.blind_set.all().
                                                          order_by('level')}
    return render(request, 'game/game.html', context)
