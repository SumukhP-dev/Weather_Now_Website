from rest_framework import routers

from data.viewsets import DataViewSet

router = routers.SimpleRouter()

router.register(r'data', DataViewSet, basename="data")

urlpatterns = router.urls