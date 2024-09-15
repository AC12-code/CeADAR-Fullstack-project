from django.core.management.base import BaseCommand
from geodata.models import GeoData

class Command(BaseCommand):
    help = 'Seed the database with initial GeoData'

    def handle(self, *args, **kwargs):
        if not GeoData.objects.filter(name='Sample Geo Data').exists():
            GeoData.objects.create(
                name='Sample Geo Data',
                vector_data='vectors/Sample_vector.geojson',
                raster_data='rasters/Sample_raster.tif'
            )
            self.stdout.write(self.style.SUCCESS('Sample Geo Data created!'))
        else:
            self.stdout.write(self.style.WARNING('Sample Geo Data already exists.'))
