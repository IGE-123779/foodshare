from rest_framework import serializers
from .models import Receita, Comentario


class ReceitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receita
        fields = ('id', 'titulo', 'categoria', 'autor', 'imagem', 'descricao',
                  'ingredientes', 'passos', 'link_video', 'gostos')


class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ('id', 'receita', 'autor', 'texto')