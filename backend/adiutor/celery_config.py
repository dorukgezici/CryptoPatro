import os

user = os.environ.get('ADIUTOR_RABBITMQ_USER', 'crypto-adiutor')
password = os.environ.get('ADIUTOR_RABBITMQ_PASSWORD', 'crypto-adiutor')
host = os.environ.get('ADIUTOR_RABBITMQ_HOST', '127.0.0.1')
port = os.environ.get('ADIUTOR_RABBITMQ_PORT', '5672')
vhost = os.environ.get('ADIUTOR_RABBITMQ_VHOST', 'crypto-adiutor')

broker_url = f'amqp://{user}:{password}@{host}:{port}/{vhost}'
result_backend = 'django-db'
beat_scheduler = 'django_celery_beat.schedulers:DatabaseScheduler'

task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']

timezone = 'UTC'
enable_utc = True
