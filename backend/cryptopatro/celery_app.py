import os

from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cryptopatro.settings")

app = Celery("cryptopatro")

# Using a string here means the worker doesn't have to serialize the configuration object to child processes.
# namespace='CELERY' means all celery-related configuration keys should have a `CELERY_` prefix.
app.config_from_object("cryptopatro.celery_config")

# Load task modules from all registered Django cryptopatro.
app.autodiscover_tasks()
