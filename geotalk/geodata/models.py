from django.contrib.gis.db import models

class GeoData(models.Model):
    name = models.CharField(max_length=100)
    vector_data = models.FileField(upload_to='vectors/', blank=True, null=True)
    raster_data = models.FileField(upload_to='rasters/', blank=True, null=True)
    geom = models.GeometryField(null=True, blank=True)  # Geometry field for spatial data

    def __str__(self):
        return self.name
