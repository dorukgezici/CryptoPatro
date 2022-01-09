#!/bin/bash
set -eo pipefail

# run validation script
python3 scripts/startup_check.py

# which container kind
case "$CRYPTOPATRO_CONTAINER_KIND" in
api)
  # migrate database
  python3 manage.py migrate

  if [[ "$CRYPTOPATRO_STAGE" == "development" ]]; then
    exec python3 manage.py runserver 0.0.0.0:80
  else
    exec gunicorn apps.wsgi:application --workers 2 --bind=0.0.0.0:80
  fi
  ;;
scheduler)
  exec celery --app apps beat -l INFO
  ;;
worker)
  exec celery --app apps worker --concurrency 10 -l INFO
  ;;
bot)
  exec python3 manage.py bot
  ;;
*)
  echo >&2 "Invalid CRYPTOPATRO_CONTAINER_KIND: $CRYPTOPATRO_CONTAINER_KIND."
  exit 1
  ;;
esac
