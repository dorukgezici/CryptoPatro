# Generated by Django 3.2.8 on 2021-10-10 16:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_binanceauth_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='TelegramUser',
            fields=[
                ('id', models.CharField(max_length=16, primary_key=True, serialize=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='tg', to=settings.AUTH_USER_MODEL, verbose_name='user')),
            ],
        ),
    ]