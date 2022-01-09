import logging

import boto3
from django.conf import settings
from django.core.management.base import BaseCommand

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Run Telegram bot"
    SECRETS_PATH = 'aws/secrets'
    ENV_FILE = 'backend-production.env'

    def handle(self, *args, **options) -> None:
        self.stdout.write(
            f"Uploading environment file {self.SECRETS_PATH}/{self.ENV_FILE} to AWS S3 bucket "
            f"{settings.AWS['secrets_bucket']}...",
        )

        with open(f'{self.SECRETS_PATH}/{self.ENV_FILE}', 'rb') as f:
            s3_client = boto3.client(
                service_name='s3',
                region_name=settings.AWS_REGION,
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            )
            s3_client.upload_fileobj(
                Fileobj=f,
                Bucket=settings.AWS['secrets_bucket'],
                Key=self.ENV_FILE,
            )

            self.stdout.write("Upload successful.")
