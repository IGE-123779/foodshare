from django.db import models


class Receita(models.Model):
    titulo = models.CharField(max_length=200)
    categoria = models.CharField(max_length=50)
    autor = models.CharField(max_length=100)
    imagem = models.CharField(max_length=500)
    descricao = models.TextField()
    ingredientes = models.TextField()
    passos = models.TextField()
    link_video = models.CharField(max_length=200)
    gostos = models.IntegerField(default=0)

    def __str__(self):
        return self.titulo


class Comentario(models.Model):
    receita = models.ForeignKey(Receita, on_delete=models.CASCADE)
    autor = models.CharField(max_length=100)
    texto = models.CharField(max_length=500)

    def __str__(self):
        return self.texto