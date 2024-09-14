FROM python:3.9-slim

# Install system dependencies for GeoDjango and GDAL
RUN apt-get update && apt-get install -y \
    binutils libproj-dev gdal-bin

# Set the GDAL_LIBRARY_PATH to the correct location
ENV GDAL_LIBRARY_PATH=/usr/lib/libgdal.so

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port 8000 for the Django app
EXPOSE 8000

# Run Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
