from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from api.models import Category, Food, Favorite, UserInfo
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.serializers import CategorySerializer, FavoriteSerializer, FoodSerializer, UserInfoSerializer


class CategoryListAPIView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetailAPIView(APIView):
    def get_object(self, category_id):
        try:
            return Category.objects.get(pk=category_id)
        except Category.DoesNotExist as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, category_id):
        instance = self.get_object(category_id)
        serializer = CategorySerializer(instance)
        return Response(serializer.data)

    def put(self, request, category_id):
        instance = self.get_object(category_id)
        serializer = CategorySerializer(instance=instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, category_id):
        instance = self.get_object(category_id)
        instance.delete()
        return Response({'deleted': True})



class FavoriteAPIView(APIView):
    def get_object(self, user):
        favorite = Favorite.objects.get_or_create(user = user)
        return favorite

    def get(self, request):
        favorite = self.get_object(request.user.id)
        favorite.user = request.user
        serializer = FavoriteSerializer(favorite)
        Response(serializer.data)