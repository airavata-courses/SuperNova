# SuperNova

Spring 2022 Project

# Developer
1. Sanket Darwante
2. Sumedh Salvi
3. Richa Jha

# Napkin Diagram
![](https://github.com/airavata-courses/SuperNova/blob/dev-wiki-data/wiki/wiki_images/napkinDaigram.jpg)

# Docker Build WeatherApi
docker build -t sdarwant/weather-radar-api-app:latest .

# Docker Run Weather Api Service
docker run -d --net weather-radar-net --name weather-radar-api-app -p 4600:4600/tcp sdarwant/weather-radar-api-app:latest

# Kubernates Commands:

# To Create Deployment:
kubectl create -f weather-radar-api-app.deployment.yml --save-config

# To Update Deployment:
kubectl apply -f weather-radar-api-app.deployment.yml

# To Delete Deployment:
kubectl delete -f weather-radar-api-app.deployment.yml

# To Create Deployment:
kubectl create -f loadbalancer.service.yml --save-config

# To Delete Deployment:
kubectl delete -f loadbalancer.service.yml 