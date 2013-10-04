poker
=====

An application for a friendly poker game.
This is all new to me, so I'll see how it goes. :-)

How to run the server locally
-----------------------------

prerequisites: 

* <code>pip install django sse django-sse</code>
* Install and run <a href="http://redis.io/">redis</a>.
* Create the database (currently in c:\temp\poker.db): <code>python manage.py syncdb</code>

Run the server:
<code>python manage.py runserver [<ip[:port]>]</code>
