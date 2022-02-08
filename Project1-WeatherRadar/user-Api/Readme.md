# SuperNova
  Spring 2022 Project

# Project 1: User Api 

## Docker

## Docker Build:
docker build -t supernova/user-api-app .

## Docker Run:
docker run -d --net weather-radar-net --name user-api-app  -p 4700:4700/tcp supernova/user-api-app:latest