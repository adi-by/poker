import time
import datetime

from django.db import models
from django.core.exceptions import ValidationError

MAX_NAME_LEN = 100
MSEC_IN_SEC = 1000


class Player(models.Model):
    """
    A poker player.
    """

    name = models.CharField(max_length=MAX_NAME_LEN)
    
    money_total = models.IntegerField(default=0)

    def __unicode__(self):
        return 'Player: {}'.format(self.name)

    def games_played(self):
        """
        Return the number of games the player appears in.
        """
        return len(self.games.all())
    
    def games_won(self):
        return self.gamed_played() - len(self.lost.filter(aborted=False))
    
    def is_active(self, game_num):
        """
        Return whether a player is still playing in a certain game.
        """
        wanted_game = self.games.get(pk=game_num)
        return wanted_game.is_player_active(self)
        
        
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
    time = models.DateTimeField(default=datetime.datetime.now)
    
    players = models.ManyToManyField(Player, related_name='games')
    players_lost = models.ManyToManyField(Player, default=[], 
                                          related_name='lost', blank=True, null=True)
    blind_schema = models.ForeignKey(BlindSchema)
    
    # State
    blind_level = models.IntegerField(default=1)
    time_in_blind_level = models.FloatField(default=0.0)
    blind_level_curr_start = models.FloatField(default=0.0)
    is_running = models.BooleanField(default=False)
    aborted = models.BooleanField(default=False)

    def __unicode__(self):
        return 'Game: {}'.format(self.time)
    
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
        
    def is_player_active(self, player):
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
                 
    def start_playing(self):
        """
        Start the timer.
        """
        self.blind_level_curr_start = time.time() * MSEC_IN_SEC
        self.is_running = True
        
    def pause_playing(self):
        """
        Pause the timer.
        """
        self.calculate_blind_state()
        self.is_running = False
        
    def calculate_blind_state(self):
        """
        Update blinds according to current time.
        """
        
        if self.is_running:
            start_calc = time.time() * MSEC_IN_SEC
            time_diff = start_calc - self.blind_level_curr_start
            # Calculation isn't finished until we've used all the time
            while time_diff > 0.0:
                curr_blind = self.blind_schema.blind_set.get(
                                                    level=self.blind_level)
                
                time_in_blind = curr_blind.time - self.time_in_blind_level
                
                if time_in_blind >= time_diff:
                    self.time_in_blind_level += time_diff
                    time_diff = 0.0
                else:
                    time_diff -= time_in_blind
                    
                    if self.blind_level < len(self.blind_schema.blind_set.all()):
                        self.blind_level += 1
                        self.time_in_blind_level = 0.0
                    else:
                        self.time_in_blind_level = curr_blind.time
                        return
                     
            self.blind_level_curr_start = start_calc
        
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
        
    def get_blind_level(self):
        return self.blind_level
    
    def get_blind_state(self):
        """
        Return current blind level and time left in it.
        """
        self.calculate_blind_state()
        curr_level = self.blind_schema.blind_set.get(level=self.blind_level)
        return curr_level.level, curr_level.time - self.time_in_blind_level
    
    def is_active(self):
        return not self.aborted and self.curr_player_num > 1

    def get_prizes(self):
        """
        Return prizes for game.
        """
        return self.prizes.all()
     

class Prize(models.Model):
    """
    A Prize money for a game.
    """
    place = models.IntegerField()
    money = models.IntegerField()
    game = models.ForeignKey(Game, related_name='prizes')

    def __unicode__(self):
        return 'Prize: {}. {}'.format(self.place, self.money)
