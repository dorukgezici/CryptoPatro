FROM ghcr.io/astral-sh/uv:0.13.0 AS uv
FROM debian:trixie-slim
COPY --from=uv /uv /uvx /bin/
WORKDIR /app
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy UV_PYTHON_INSTALL_DIR=/opt/python PATH="/app/.venv/bin:$PATH"
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*
RUN uv python install 3.15.0
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project
COPY cryptopatro ./cryptopatro
RUN uv sync --frozen --no-dev && useradd --create-home --uid 10001 appuser && mkdir -p /app/data && chown appuser:appuser /app/data
ENV CRYPTOPATRO_DATABASE_PATH=/app/data/cryptopatro.sqlite3
USER appuser
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD ["python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/api/health', timeout=3)"]
CMD ["uvicorn", "cryptopatro.main:app", "--host", "0.0.0.0", "--port", "8000", "--no-proxy-headers"]
