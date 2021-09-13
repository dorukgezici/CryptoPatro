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
        'POSTGRESQL_PORT',
        'POSTGRESQL_DATABASE',
        'POSTGRESQL_USER',
        'POSTGRESQL_PASSWORD',
        # AWS
        'AWS_REGION',
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        # Binance
        'BINANCE_API_KEY',
        'BINANCE_API_SECRET',
        # Cryptopanic
        'CRYPTOPANIC_AUTH_TOKEN',
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
