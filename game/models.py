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
        return len(self.game_set.all())
        
    
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
    
    big = models.IntegerField()
    small = models.IntegerField()
    time = models.IntegerField()
    ante = models.IntegerField(blank=True, null=True)
    
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
    
    pay = models.IntegerField()
    bounty = models.IntegerField()
    date = models.DateField(default=datetime.date.today)
    
    players = models.ManyToManyField(Player)
    blind_schema = models.ForeignKey(BlindSchema)

    def __unicode__(self):
        return 'Game: {}'.format(self.date)
    
    def player_num(self):
        """
        Return number of players.
        """
        return len(self.players.all())
    
    def prize_money(self):
        return self.player_num() * self.pay
    

class Prize(models.Model):
    """
    A Prize money for a game.
    """
    
    place = models.IntegerField()
    money = models.IntegerField()
    game = models.ForeignKey(Game, related_name='prizes')

    def __unicode__(self):
        return 'Prize: {}. {}'.format(self.place, self.money)
