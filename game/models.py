import datetime

from django.db import models
from django.core.exceptions import ValidationError

MAX_NAME_LEN = 100


class Player(models.Model):
    """
    A poker player.
    """
    
    first_name = models.CharField(max_length=MAX_NAME_LEN)
    last_name = models.CharField(max_length=MAX_NAME_LEN)
    
    money_total = models.IntegerField(default=0)
    
    def __unicode__(self):
        return 'Player: {} {}'.format(self.first_name, self.last_name)
    
    def games_played(self):
        """
        Return the number of games the player appears in.
        """
        return len(self.games.all())
    
    def games_won(self):
        return self.gamed_played() - len(self.lost.all())
    
    def is_active(self, game_num):
        """
        Return whether a player is still playing in a certain game.
        """
        wanted_game = self.games.get(pk=game_num)
        return wanted_game.is_active(self)
        
        
class BlindSchema(models.Model):
    """
    A schema of blinds, each with its own parameters.
    """
    
    name = models.CharField(max_length=MAX_NAME_LEN)
    
    def __unicode__(self):
        return 'Schema: {}'.format(self.name)
    
    
class Blind(models.Model):
    """
    A blind level.
    """
    
    level = models.IntegerField()
    big = models.IntegerField()
    small = models.IntegerField()
    ante = models.IntegerField(blank=True, null=True)
    time = models.IntegerField()
    
    schema = models.ForeignKey(BlindSchema)
    
    def __unicode__(self):
        return 'Blind: big={}, small={}, ante={}, time={}'.format(
                                self.big, self.small, self.ante, self.time)
    
    def clean(self):
        if self.ante is None or not self.ante:
            self.ante = 0
            
        if self.big < self.small:
            raise ValidationError('Big blind must be bigger than small blind')
        
        if self.small < self.ante:
            raise ValidationError('Small blind must be bigger than ante')
        
    
class Game(models.Model):
    """
    Parameters of an entire game.
    """
    
    pay = models.IntegerField()     # Per player
    chips = models.IntegerField()   # Per player
    bounty = models.IntegerField()
    date = models.DateField(default=datetime.date.today)
    
    players = models.ManyToManyField(Player, related_name='games')
    players_lost = models.ManyToManyField(Player, default=[], related_name='lost')
    blind_schema = models.ForeignKey(BlindSchema)

    def __unicode__(self):
        return 'Game: {}'.format(self.date)
    
    def starting_player_num(self):
        """
        Return number of players at start of the game.
        """
        return len(self.players.all())
    
    def curr_player_num(self):
        """
        Return current number of players.
        """
        return self.starting_player_num() - len(self.players_lost.all())
    
    def prize_money(self):
        return self.starting_player_num() * self.pay
    
    def average_stack(self):
        return ((self.chips * self.starting_player_num()) / 
                float(self.curr_player_num()))
        
    def is_active(self, player):
        """
        Return whether a player is active.
        """
        return (player in self.players.all() and 
                player not in self.players_lost.all())
        
    def remove_player(self, player):
        """
        Removes a player from the game.
        """
        self.players_lost.add(player)
        
    # For templates
    
    def get_blinds(self):
        """
        Return the blinds as a sorted list.
        """
        return self.blind_schema.blind_set.all().order_by('level')
    
    def get_players(self):
        """
        Return list of playing players.
        """
        return [player for player in self.players.all() 
                if player not in self.players_lost.all()]
    

class Prize(models.Model):
    """
    A Prize money for a game.
    """
    
    place = models.IntegerField()
    money = models.IntegerField()
    game = models.ForeignKey(Game, related_name='prizes')

    def __unicode__(self):
        return 'Prize: {}. {}'.format(self.place, self.money)
