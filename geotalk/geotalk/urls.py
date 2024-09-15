from django.urls import path, include
from rest_framework.routers import DefaultRouter
from geodata.views import GeoDataViewSet
from django.conf import settings  # <-- Import settings
from django.conf.urls.static import static  # <-- Import static

router = DefaultRouter()
router.register(r'geodata', GeoDataViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



