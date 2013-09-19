from django.contrib import admin
from models import Player, Blind, BlindSchema, Game, Prize

admin.site.register(Player)
admin.site.register(Blind)
admin.site.register(BlindSchema)
admin.site.register(Game)
admin.site.register(Prize)