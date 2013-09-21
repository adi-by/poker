from django.core.serializers import serialize
from django.db.models.query import QuerySet
from django.utils import simplejson
from django.template import Library

from django.utils.safestring import SafeString

register = Library()

def jsonify(object):
    if isinstance(object, QuerySet):
        return SafeString(serialize('json', object))
    return SafeString(simplejson.dumps(object))

register.filter('jsonify', jsonify)