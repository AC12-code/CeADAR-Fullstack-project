# Full stack developer coding assignment
1) Database used is Postgresql with Postgis extension to store the data
2) From the backend the list of json format objects is posted on <http://localhost:8000/api/geodata/>
   
  ![geo data list](https://github.com/user-attachments/assets/8774dd94-8445-4c2a-9458-cd2c777cab1a)
3)Clicking on vector_data link shows yo the geojson data at <http://localhost:8000/media/vectors/Sample_vector.geojson>

![vector](https://github.com/user-attachments/assets/b6c23f1e-92c7-4f25-a270-aac494125b0a)

4)Clicking on raster_data downloads the tif file to the system.

5)At the frontend the geojson data is fetched and interactive map layer is rendered at <http://localhost:3000/>

6)When you click on the rendered map at any specific locatione it displays info like station name ,division ,etc..

![front](https://github.com/user-attachments/assets/13d16207-2a50-465f-9b3c-92772905ff31)

7) To display the raster data as a tile layer it is converted from .tif to .png tiles in the data/rasters/tiles directory with the help of gdal using th following command gdal2tiles.py -p mercator -z 0-11 /app/data/rasters/Sample_raster.tif /app/data/rasters/tiles placed in docker-compose.yml.
8) The tiles are served at http://localhost:8000/media/rasters/tiles/{z}/{x}/{y}.png.
For eg. <http://localhost:8000/media/rasters/tiles/11/1026/1364.png> displays the following tile. Tiles are present for all zoom levels.
![tile](https://github.com/user-attachments/assets/a8be1727-662f-490b-baac-a769280ffea3)

9) All the services frontend ,backend,database are run using Docker containers on Docker desktop.(#Docker desktop should be installed on the system)
10) If running for the first time use command docker-compose up --build on vscode terminal. If not the first time use command docker-compose up.
11) After the containers are up and running you can see their running status on docker desktop like this
 ![docker](https://github.com/user-attachments/assets/89526399-611e-4f9c-97ba-b7b888b12500)

12) To debug issues in any container you can debug by checking the logs. If no issues  you can access the frontend and backend through the designation API urls.

To summarise this was great project and I got to learn many new things. The project has scope of improvement and I am sure with more practice and guidance I can improve it. Thank You.


    

