from django.contrib.postgres.fields import ArrayField
from django.db import models

class Data(models.Model):
    username = models.CharField(max_length=255)
    list_of_favorite_searches = ArrayField(models.CharField(max_length=225, blank=True))
    location = models.CharField(max_length=255)
