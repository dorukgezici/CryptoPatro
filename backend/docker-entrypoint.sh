#!/bin/bash
set -eo pipefail

PROJECT=adiutor

# run validation script
python3 scripts/startup_check.py

# which container kind
case "$ADIUTOR_CONTAINER_KIND" in
api)
  # migrate database
  python3 manage.py migrate

  if [[ "$ADIUTOR_STAGE" == "development" ]]; then
    exec python3 manage.py runserver 0.0.0.0:80
  else
    exec gunicorn "$PROJECT".wsgi:application --workers 2 --bind=0.0.0.0:80
  fi
  ;;
scheduler)
  exec celery --app "$PROJECT" beat -l INFO
  ;;
worker)
  exec celery --app "$PROJECT" worker --concurrency 10 -l INFO
  ;;
*)
  echo >&2 "Invalid ADIUTOR_CONTAINER_KIND: $ADIUTOR_CONTAINER_KIND."
  exit 1
  ;;
esac
