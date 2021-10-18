# Generated by Django 3.2.8 on 2021-10-18 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exchange', '0007_auto_20211011_0831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolioasset',
            name='amount',
            field=models.DecimalField(decimal_places=8, default=0, max_digits=64, verbose_name='amount (quantity)'),
        ),
        migrations.AlterField(
            model_name='portfolioasset',
            name='avg_charge',
            field=models.DecimalField(decimal_places=8, default=0, max_digits=64, verbose_name='average charge'),
        ),
        migrations.AlterField(
            model_name='portfolioasset',
            name='avg_cost',
            field=models.DecimalField(decimal_places=8, default=0, max_digits=64, verbose_name='average cost'),
        ),
        migrations.AlterField(
            model_name='portfolioasset',
            name='buy_amount',
            field=models.DecimalField(decimal_places=8, default=0, max_digits=64, verbose_name='buy amount'),
        ),
        migrations.AlterField(
            model_name='portfolioasset',
            name='realized_pnl',
            field=models.DecimalField(decimal_places=8, default=0, max_digits=64, verbose_name='realized pnl'),
        ),
        migrations.AlterField(
            model_name='portfolioasset',
            name='sell_amount',
            field=models.DecimalField(decimal_places=8, default=0, max_digits=64, verbose_name='sell amount'),
        ),
        migrations.AlterField(
            model_name='portfolioasset',
            name='unrealized_pnl',
            field=models.DecimalField(decimal_places=8, default=0, max_digits=64, verbose_name='unrealized pnl'),
        ),
        migrations.AlterField(
            model_name='portfolioasset',
            name='value',
            field=models.DecimalField(decimal_places=8, default=0, max_digits=64, verbose_name='value (USD)'),
        ),
    ]
