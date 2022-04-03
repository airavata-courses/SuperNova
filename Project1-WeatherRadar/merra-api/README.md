# Docker Build Merra Api
docker build -t sdarwant/merra-api-app:latest .

# Docker Run Merra ApiService
docker run -d --net weather-radar-net --name merra-api-app -p 4600:4600/tcp sdarwant/merra-api-app:latest

## Kubernetes Config Merra Api:

## Create Deployment Merra Api:
 kubectl create -n weather-app -f merra-api-app.deployment.yml --save-config

## Create CLUSTER-IP Merra Api:
 kubectl create -n weather-app -f merra-api-app.clusterIP.service.yml --save-config

## Create LOAD-BALANCER Merra Api:
 kubectl create -n weather-app -f merra-api-app-loadbalancer.service.yml --save-config
