# Generated by Django 3.2.8 on 2021-10-11 00:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("exchange", "0004_portfolioasset_avg_charge"),
    ]

    operations = [
        migrations.AddField(
            model_name="portfolioasset",
            name="value",
            field=models.DecimalField(decimal_places=8, default=0, max_digits=64, verbose_name="value"),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="portfolioasset",
            name="realized_pnl",
            field=models.DecimalField(decimal_places=8, max_digits=64, verbose_name="realized pnl"),
        ),
        migrations.AlterField(
            model_name="portfolioasset",
            name="unrealized_pnl",
            field=models.DecimalField(decimal_places=8, max_digits=64, verbose_name="unrealized pnl"),
        ),
    ]
