# SuperNova
  Spring 2022 Project

# Project 1: User Api 

## Docker

## Docker Build:
docker build -t supernova/user-api-app .

## Docker Run:
docker run -d --net weather-radar-net --name user-api-app  -p 4700:4700/tcp supernova/user-api-app:latest

# Kubernates Commands:

# To Create Deployment:
kubectl create -f user-api-app.deployment.yml --save-config

# To Update Deployment:
kubectl apply -f user-api-app.deployment.yml

# To Delete Deployment:
kubectl delete -f user-api-app.deployment.yml

# To Create Deployment:
kubectl create -f loadbalancer.service.yml --save-config

# To Delete Deployment:
kubectl delete -f loadbalancer.service.yml

kubectl create -f user-api-app.clusterIP.service.yml --save-config

# Kubernates Get All Details:
kubectl get all