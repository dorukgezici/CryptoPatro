import os

user = os.environ.get('CRYPTOPATRO_RABBITMQ_USER', 'cryptopatro')
password = os.environ.get('CRYPTOPATRO_RABBITMQ_PASSWORD', 'cryptopatro')
host = os.environ.get('CRYPTOPATRO_RABBITMQ_HOST', 'localhost')
port = os.environ.get('CRYPTOPATRO_RABBITMQ_PORT', '5672')
vhost = os.environ.get('CRYPTOPATRO_RABBITMQ_VHOST', 'cryptopatro')

broker_url = f'amqp://{user}:{password}@{host}:{port}/{vhost}'
result_backend = 'django-db'
beat_scheduler = 'django_celery_beat.schedulers:DatabaseScheduler'

task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']

timezone = 'UTC'
enable_utc = True
