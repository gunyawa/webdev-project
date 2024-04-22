from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication as JSONWebTokenAuthentication


from api.models import Category, Food, Favorite
from api.serializers import CategorySerializer, FoodSerializer, UserInfoSerializer, FavoriteSerializer


@api_view(['GET'])
def food_by_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Category.DoesNotExist as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        foods = Food.objects.filter(category=category)
        serializer = FoodSerializer(foods, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def food_list(request):
    if request.method == "GET":
        foods = Food.objects.all()
        serializer = FoodSerializer(foods, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def favorite(request, user_id):
    if request.method == "GET":
        favorite = Favorite.objects.get(user_id = user_id)
        serializer = FavoriteSerializer(favorite)
        return Response(serializer.data)
    # favorite, created = Favorite.objects.get_or_create(user_id=user_id)
    # if request.method == 'POST':
    #     serializer = FavoriteSerializer(favorite, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # else:
    #     serializer = FavoriteSerializer(favorite)
    #     return Response(serializer.data)




@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    user_id = request.user.id
    return JsonResponse({'user_id': user_id})


@api_view(['DELETE','GET'])
@permission_classes([IsAuthenticated])

def remove_from_favorites(request, food_id):
    user_id = request.user.id
    try:
        favorite = Favorite.objects.get(user_id=user_id)
        favorite.foods.remove(food_id)
        favorite.save()
        return Response({'message': f'Food item {food_id} has been removed from favorites.'})
    except Favorite.DoesNotExist:
        return Response({'error': 'No favorite found for this user.'}, status=status.HTTP_404_NOT_FOUND)
    except ValueError:
        return Response({'error': 'The specified food ID is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_favorites(request, food_id):
    user_id = request.user.id
    try:
        favorite = Favorite.objects.get(user_id=user_id)
        favorite.foods.add(food_id)
        favorite.save()
        serializer = FavoriteSerializer(favorite)
        return Response(serializer.data)
    except Favorite.DoesNotExist:
        return Response({'error': 'No favorite found for this user.'}, status=status.HTTP_404_NOT_FOUND)
    except ValueError:
        return Response({'error': 'The specified food ID is invalid.'}, status=status.HTTP_400_BAD_REQUEST)