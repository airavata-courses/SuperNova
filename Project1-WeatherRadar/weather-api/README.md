# Docker Build WeatherApi
docker build -t sdarwant/weather-radar-api-app:latest .

# Docker Run Weather Api Service
docker run -d --net weather-radar-net --name weather-radar-api-app -p 4600:4600/tcp sdarwant/weather-radar-api-app:latest

## Kubernetes Config WEATHER-API:

## Create Deployment WEATHER-API:
 kubectl create -n weather-app -f weather-radar-api-app.deployment.yml --save-config

## Create CLUSTER-IP WEATHER-API:
 kubectl create -n weather-app -f weather-radar.clusterIP.service.yml --save-config

## Create LOAD-BALANCER WEATHER-API:
 kubectl create -n weather-app -f weather-radar-loadbalancer.service.yml --save-config