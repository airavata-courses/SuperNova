## Build Step
npm install

npm run dev



## Docker

## Docker Build:
docker build -t supernova/weather-radar-gateway-app .

## Docker Run:
docker run --net weather-radar-net --name weather-radar-gateway-app -p 4300:4300/tcp supernova/weather-radar-gateway-app:latest