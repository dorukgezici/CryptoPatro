import os
from pathlib import Path
from re import A

import sentry_sdk
from corsheaders.defaults import default_headers
from django.utils.translation import gettext_lazy as _
from sentry_sdk.integrations.celery import CeleryIntegration
from sentry_sdk.integrations.django import DjangoIntegration

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

CRYPTOPATRO = {
    "secret_key": os.environ.get("CRYPTOPATRO_SECRET_KEY", "notsosecretkey"),
    "stage": os.environ.get("CRYPTOPATRO_STAGE", "development"),
    "backend_url": os.environ.get("CRYPTOPATRO_BACKEND_URL", "http://localhost:8000"),
    "frontend_url": os.environ.get("CRYPTOPATRO_FRONTEND_URL", "http://localhost:4321"),
}

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = CRYPTOPATRO["secret_key"]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = CRYPTOPATRO["stage"] == "development"

ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = [CRYPTOPATRO["backend_url"], CRYPTOPATRO["frontend_url"]]

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # libraries
    "corsheaders",
    "django_celery_results",
    "django_celery_beat",
    "ninja",
    # apps
    "apps.users",
    "apps.exchange",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "apps.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "apps.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": os.environ.get("CRYPTOPATRO_POSTGRESQL_HOST", "localhost"),
        "NAME": os.environ.get("CRYPTOPATRO_POSTGRESQL_DATABASE", "cryptopatro"),
        "PORT": os.environ.get("CRYPTOPATRO_POSTGRESQL_PORT", "5432"),
        "USER": os.environ.get("CRYPTOPATRO_POSTGRESQL_USER", "cryptopatro"),
        "PASSWORD": os.environ.get("CRYPTOPATRO_POSTGRESQL_PASSWORD", "cryptopatro"),
    },
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

AUTH_USER_MODEL = "users.User"

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGES = [
    ("en", _("English")),
    ("tr", _("Turkish")),
]
LOCALE_PATHS = [os.path.join(BASE_DIR, "locale")]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# CORS
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_HEADERS = list(default_headers) + ["sentry-trace"]

# Sentry
sentry_sdk.init(
    dsn=os.environ.get("CRYPTOPATRO_SENTRY_DSN"),
    environment=CRYPTOPATRO["stage"],
    integrations=[DjangoIntegration(), CeleryIntegration()],
    # Set traces_sample_rate to 1.0 to capture 100% of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,
    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True,
)

# Configurations

CRYPTOPANIC = {
    "auth_token": os.environ.get("CRYPTOPATRO_CRYPTOPANIC_AUTH_TOKEN"),
}

TELEGRAM = {
    "bot_token": os.environ.get("CRYPTOPATRO_TELEGRAM_BOT_TOKEN"),
}
