from django.urls import path
from . import views

urlpatterns = [
    path('api/recipes/', views.recipes),
    path('api/recipe/<int:recipe_id>', views.recipe_detail),
    path('api/comments/<int:recipe_id>', views.comments),
    path('api/comment/<int:comment_id>', views.comment_detail),
]