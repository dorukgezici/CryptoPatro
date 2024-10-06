#!/bin/bash
set -eo pipefail

# run validation script
uv run scripts/startup_check.py

# which container kind
case "$CRYPTOPATRO_CONTAINER_KIND" in
api)
  # migrate database
  uv run manage.py migrate

  if [[ "$CRYPTOPATRO_STAGE" == "development" ]]; then
    exec uvicorn cryptopatro.asgi:application --host 0.0.0.0 --port 8000 --reload
  else
    exec uvicorn cryptopatro.asgi:application --host 0.0.0.0 --port 8000
  fi
  ;;
scheduler)
  exec celery --app cryptopatro beat -l INFO
  ;;
worker)
  exec celery --app cryptopatro worker --concurrency 10 -l INFO
  ;;
bot)
  exec uv run manage.py bot
  ;;
*)
  echo >&2 "Invalid CRYPTOPATRO_CONTAINER_KIND: $CRYPTOPATRO_CONTAINER_KIND."
  exit 1
  ;;
esac
