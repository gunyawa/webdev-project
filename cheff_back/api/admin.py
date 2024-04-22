from django.contrib import admin

from api.models import Category, Food, Favorite

admin.site.register(Category)
admin.site.register(Food)
admin.site.register(Favorite)
