# Generated by Django 3.2.8 on 2021-10-15 12:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20211010_2033'),
    ]

    operations = [
        migrations.CreateModel(
            name='FtxAuth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated at')),
                ('api_key', models.CharField(max_length=256, verbose_name='api key')),
                ('api_secret', models.CharField(max_length=256, verbose_name='api secret')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='ftx', to=settings.AUTH_USER_MODEL, verbose_name='user')),
            ],
        ),
    ]
