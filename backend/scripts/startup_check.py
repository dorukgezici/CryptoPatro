import logging
import os
import sys

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')

required_environment_variables = [
    '{prefix}{name}'.format(
        prefix='ADIUTOR_',
        name=name,
    )
    for name in [
        # Django
        'SECRET_KEY',
        'STAGE',
        'BACKEND_URL',
        'FRONTEND_URL',
        # Database
        'POSTGRESQL_HOST',
        'POSTGRESQL_DATABASE',
        'POSTGRESQL_PORT',
        'POSTGRESQL_USER',
        'POSTGRESQL_PASSWORD',
        # RabbitMQ
        'RABBITMQ_HOST',
        'RABBITMQ_VHOST',
        'RABBITMQ_PORT',
        'RABBITMQ_USER',
        'RABBITMQ_PASSWORD',
        # Sentry
        'SENTRY_DSN',
        # AWS
        'AWS_REGION',
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        # Cryptopanic
        'CRYPTOPANIC_AUTH_TOKEN',
        # Telegram
        'TELEGRAM_BOT_TOKEN',
    ]
]

missing_environment_variables = []

for required_environment_variable in required_environment_variables:
    if required_environment_variable not in os.environ:
        missing_environment_variables.append(required_environment_variable)

if len(missing_environment_variables) > 0:
    logging.error(
        "These environment variables are required but not set: {missing_environment_variables}".format(
            missing_environment_variables=', '.join(missing_environment_variables),
        )
    )

if len(missing_environment_variables) > 0:
    sys.exit(1)

logging.info("Startup check is complete.")
