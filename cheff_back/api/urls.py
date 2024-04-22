from django.urls import path
from api import views
from rest_framework_jwt.views import obtain_jwt_token
urlpatterns = [
    path('categories/', views.CategoryListAPIView.as_view()),
    path('categories/<int:category_id>', views.CategoryDetailAPIView.as_view()),
    path('categories/<int:category_id>/foods', views.food_by_category),
    path('foods/', views.food_list),
    path('login/', obtain_jwt_token),
    path('favorites/<int:user_id>', views.favorite),
    path('add-to-favorite/<int:food_id>/', views.add_to_favorites),
    path('user_id/', views.get_user_id),
    path('remove-from-favorite/<int:food_id>/', views.remove_from_favorites),
    # path('products/<int:product_id>/', views.product_details),
]
