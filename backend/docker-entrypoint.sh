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
    exec uvicorn apps.asgi:application --host 0.0.0.0 --port 8000 --reload
  else
    exec uvicorn apps.asgi:application --host 0.0.0.0 --port 8000
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
