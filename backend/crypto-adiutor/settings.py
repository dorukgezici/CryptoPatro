import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('ADIUTOR_SECRET_KEY', 'notsosecretkey')

ADIUTOR = {
    'stage': os.environ.get('ADIUTOR_STAGE'),
    'backend_url': os.environ.get('ADIUTOR_BACKEND_URL'),
    'frontend_url': os.environ.get('ADIUTOR_FRONTEND_URL'),
}

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = ADIUTOR['stage'] == 'dev'

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'crypto-adiutor.users.apps.UsersConfig',
    'crypto-adiutor.exchange.apps.ExchangeConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'crypto-adiutor.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'crypto-adiutor.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.environ.get('ADIUTOR_POSTGRESQL_HOST'),
        'PORT': os.environ.get('ADIUTOR_POSTGRESQL_PORT'),
        'NAME': os.environ.get('ADIUTOR_POSTGRESQL_DATABASE'),
        'USER': os.environ.get('ADIUTOR_POSTGRESQL_USER'),
        'PASSWORD': os.environ.get('ADIUTOR_POSTGRESQL_PASSWORD'),
    },
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'users.User'

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_RENDERER_CLASSES': (
        'djangorestframework_camel_case.render.CamelCaseJSONRenderer',
        'djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'djangorestframework_camel_case.parser.CamelCaseFormParser',
        'djangorestframework_camel_case.parser.CamelCaseMultiPartParser',
        'djangorestframework_camel_case.parser.CamelCaseJSONParser',
    ),
}

CORS_ALLOW_ALL_ORIGINS = True

# Configurations

AWS = {
    'region': os.environ.get('ADIUTOR_AWS_REGION'),
    'access_key_id': os.environ.get('ADIUTOR_AWS_ACCESS_KEY_ID'),
    'secret_access_key': os.environ.get('ADIUTOR_AWS_SECRET_ACCESS_KEY'),
}
AWS_REGION = AWS['region']
AWS_ACCESS_KEY_ID = AWS['access_key_id']
AWS_SECRET_ACCESS_KEY = AWS['secret_access_key']

BINANCE = {
    'api_key': os.environ.get('ADIUTOR_BINANCE_API_KEY'),
    'api_secret': os.environ.get('ADIUTOR_BINANCE_API_SECRET'),
}

CRYPTOPANIC = {
    'auth_token': os.environ.get('ADIUTOR_CRYPTOPANIC_AUTH_TOKEN'),
}
