from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *


@api_view(['GET', 'POST'])
def recipes(request):

    if request.method == 'GET':
        recipe_list = Receita.objects.all()
        serializer = ReceitaSerializer(recipe_list, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ReceitaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def recipe_detail(request, recipe_id):

    try:
        recipe = Receita.objects.get(pk=recipe_id)
    except Receita.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ReceitaSerializer(recipe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'DELETE':
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def comments(request, recipe_id):

    if request.method == 'GET':
        recipe = Receita.objects.get(pk=recipe_id)
        comment_list = recipe.comentario_set.all()
        serializer = ComentarioSerializer(comment_list, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ComentarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def comment_detail(request, comment_id):

    try:
        comment = Comentario.objects.get(pk=comment_id)
    except Comentario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ComentarioSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)
