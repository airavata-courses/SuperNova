# Supernova
## Weather Cache 

## Build Step
npm install

npm start

## Docker
## Docker Build & Run:

Step 0: (Create Network is not already)
docker network create weather-radar-net

Step 1: Pull Reddis Docker Image
docker pull redis

Step 2: Run Reddis Image
docker run -d --net weather-radar-net --name weather-cache-redis -p 6379:6379 -d redis

Step 3: Build weather cache app
docker build -t supernova/weather-cache-app .

Step 3: Run weather cache app
docker run --net weather-radar-net --name weather-cache-app -p 4400:4400/tcp supernova/weather-cache-app:latest


