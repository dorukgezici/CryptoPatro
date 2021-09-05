from rest_framework import serializers

from .models import Asset, Portfolio, PortfolioAsset


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


class PortfolioAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioAsset
        fields = '__all__'
