import base64

from django.template import Library
from django.utils.safestring import SafeString

from jsonify import jsonify

register = Library()

def encode(object):
    return SafeString(base64.standard_b64encode(jsonify(object)))

register.filter('encode', encode)