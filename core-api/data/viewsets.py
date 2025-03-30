from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from data.models import Data

from data.serializers import DataSerializer


class DataViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [AllowAny]