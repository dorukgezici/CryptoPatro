from rest_framework import serializers

from .models import Asset, Portfolio


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = [
            'id',
            'ticker',
            'name',
            'icon',
        ]


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = '__all__'
