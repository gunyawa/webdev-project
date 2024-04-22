from django.utils.translation import gettext as _
from rest_framework import serializers
from api.models import Category, Food, UserInfo, Favorite
from django.contrib.auth.models import User


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    imageUrl = serializers.CharField()

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('__all__')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_superuser', 'is_staff')


class FavoriteSerializer(serializers.ModelSerializer):
    foods = FoodSerializer(many=True)
    user = UserSerializer()
    class Meta:
        model = Favorite
        fields = ('__all__')


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("__all__")