# Generated by Django 3.2.7 on 2021-09-21 14:06

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0002_binanceauth"),
    ]

    operations = [
        migrations.AlterField(
            model_name="binanceauth",
            name="api_key",
            field=models.CharField(max_length=64, verbose_name="api key"),
        ),
        migrations.AlterField(
            model_name="binanceauth",
            name="api_secret",
            field=models.CharField(max_length=64, verbose_name="api secret"),
        ),
    ]
