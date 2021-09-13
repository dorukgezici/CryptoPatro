#!/bin/bash
set -eo pipefail

# run validation script
python3 scripts/startup_check.py

# migrate database
python3 manage.py migrate

# run server
exec python3 manage.py runserver 0.0.0.0:80
