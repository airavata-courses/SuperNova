## Build Step
npm install

npm run dev



## Docker

## Docker Build:
docker build -t supernova/weather-radar-gateway-app .

## Docker Run:
docker run -d -it -p 4300:4300/tcp supernova/weather-radar-gateway-app:latest