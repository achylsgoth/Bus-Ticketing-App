from rest_framework.routers import DefaultRouter
from .views import BusViewSet, RouteViewSet, ScheduleViewSet

router = DefaultRouter()
router.register(r'buses', BusViewSet)
router.register(r'routes', RouteViewSet)
router.register(r'schedules', ScheduleViewSet)

urlpatterns = router.urls
