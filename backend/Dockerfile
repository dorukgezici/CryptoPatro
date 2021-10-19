FROM python:3.9

ENV PYTHONUNBUFFERED 1

WORKDIR /adiutor

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY adiutor adiutor
COPY fixtures fixtures
COPY locale locale
COPY scripts scripts
COPY manage.py manage.py

RUN python3 manage.py collectstatic --no-input

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

CMD ["docker-entrypoint.sh"]
