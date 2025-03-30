from rest_framework import serializers

from data.models import Data


class DataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Data
        fields = ['username', 'list_of_favorite_searches', 'location']
        read_only_fields = ['username', 'location']