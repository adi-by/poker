from django.shortcuts import render
from game.models import Game

    
def main(request):
    """
    Main page.
    """
    active_games = [game for game in Game.objects.all() if game.is_active()]
    return render(request, 'main/main.html', {'games': active_games})