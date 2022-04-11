# SuperNova
Spring 2022 Project

# Developers
1. Sanket Darwante
2. Sumedh Salvi
3. Richa Jha

# Project 3:
* Demo App: http://weatherapp.twilightparadox.com:30000
* CI/CD Jenkin: http://149.165.154.149:8080/job/ADS/
* jetstream instance: supernova_weather_app_instance
* [Architectural Optimization](https://github.com/airavata-courses/SuperNova/wiki/Architectural-Optimization)
* [MERRA-2 Service Architecture](https://github.com/airavata-courses/SuperNova/blob/dev-wiki-data/wiki/wiki_images/DataAssimilation-MERRA-API.png)

# Project Setup Guide
* [Project Setup Instructions](https://github.com/airavata-courses/SuperNova/wiki/Weather-Radar-Project-Setup)

# Functional Specification
* [A Complete Guide For User](https://github.com/airavata-courses/SuperNova/blob/dev-wiki-data/wiki/wiki_images/Functional%20Specification.pdf)

# Scalability Report
* [Weather Radar Scalability Testing](https://github.com/airavata-courses/SuperNova/wiki/Project-2:-Weather-Radar-Scalability-Testing)

# Technology Stack
* Front End: Angular
* API Gateway: Node.js, Express.js
* Cache Service: Node.js, Express.js, Redis, Kafka
* NexRAD Service - FastAPI, NexDraw, Pyart, Kafka
* Merra-2 Service: FastAPI, NexDraw, Pyart, BaseMAP, xarray, Kafka
* User and Session Management: Spring Boot (Java), MySQL
* Scalability Testing: Apache JMeter, Metrics Server, Prometheus, Grafana
* Containerization: Docker
* Orchestration: Kubernetes
* CI/CD: Jenkins

# Branch Distribution

### Release Branch:<br>
* Project-1: [main-project1](https://github.com/airavata-courses/SuperNova/tree/main-project1)
* Project-2: [main-project2](https://github.com/airavata-courses/SuperNova/tree/main-project2)
* Project-3:
  * User Interface: [rel-ui-angular-phase3](https://github.com/airavata-courses/SuperNova/tree/rel-ui-angular-phase3)<br>
  * Gateway API: [rel-gateway-api-phase3](https://github.com/airavata-courses/SuperNova/tree/rel-gateway-api-phase3)<br>
  * Cache Microservice: [rel-ms-weather-cache-phase3](https://github.com/airavata-courses/SuperNova/tree/rel-ms-weather-cache-phase3)<br>
  * Weather API Microservice: [rel-ms-weather-api-phase3](https://github.com/airavata-courses/SuperNova/tree/rel-ms-weather-api-phase3)<br>
  * User API Microservice: [rel-ms-user-api-phase3](https://github.com/airavata-courses/SuperNova/tree/rel-ms-user-api-phase3)<br>
  * MERRA API Microservice: [rel-ms-merra-api-phase3](https://github.com/airavata-courses/SuperNova/tree/rel-ms-merra-api-phase3)

### Dev Branches:<br>
* User Interface: dev-ui-angular<br>
* Gateway API: dev-gateway-api<br>
* Cache Microservice: dev-ms-weather-cache<br>
* Weather API Microservice: dev-ms-weather-api<br>
* User API Microservice: dev-ms-user-api<br>
* Merra-2 API Microservice: dev-ms-merra-api

# Napkin Diagram
![](https://github.com/airavata-courses/SuperNova/blob/dev-wiki-data/wiki/wiki_images/napkinDaigram.jpg)


# Architecture Diagram
![](https://github.com/airavata-courses/SuperNova/blob/dev-wiki-data/wiki/wiki_images/Project3-ArchitectureDiagram.png)
