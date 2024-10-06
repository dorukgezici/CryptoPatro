FROM python:3.12 AS base
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv
WORKDIR /app
COPY pyproject.toml uv.lock README.md ./
RUN uv sync --frozen

FROM base AS runtime
ENV PYTHONUNBUFFERED=1

COPY cryptopatro cryptopatro
COPY fixtures fixtures
COPY locale locale
COPY scripts scripts
COPY manage.py manage.py

RUN ["uv", "run", "manage.py", "collectstatic", "--no-input"]

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8000
CMD ["docker-entrypoint.sh"]
