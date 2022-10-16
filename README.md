# Team: SuperNova
Applied Distributed Systems: Spring 2022 Project

Course Objectives:
* Provide a high level, broad understanding of the application of core distributed computing systems concepts and apply them to build “Software as a     Service” systems.
* Study both abstract concepts and practical techniques for building Cloud-Native Distributed Systems.
* Provide hands-on experience in developing scalable application stacks while working with open source philosophies modeled after Apache Software       Foundation.
* Apply the general concepts of Distributed Systems to understanding the state of the art in “real world” systems.

# Course Project:
1. Weather Data Process & Analysis: 
   * Design distributed system which will process realtime data produces by weather data collecting system.
   * Analysize the process data and generate visualization for weather reflectivity.
   * Data is feeded from NexRAD Airport Weather Radar & NASA MERRA-2 Weather Sattelite Data.
   * Project Phase:
     * Design MVP microservice-based system to process & visualize data from NexRAD dataset.
     * Containerized services using docker & setup deployment pipeline using jenkins.
     * Orchestration using kubernetes to make system scalable, reliable & fault tolerant.
     * System reliability & Stress testing using JMeter.
     * Integration on new service to handle MERRA-2 NASA satellite Data.
     * Recalibirate system again by reliability & Stress testing.
   
2. Custos Science Gateway Identity Management - Case Study
   * Did a case study analysis of Apache Airavata built CUSTOS project.
   * CUSTOS built using CILogon, LDAP and Active Directory. 
   * Did system analysis of 7 core features like identity, access, profile,resource secret, group and sharing management.
   * Project consists of 14 different microservices, we build and test deployment of each service on a cloud environment.
   * Did a 15 different stress test on the CUSTOS system and documented the result to analyze the robustness of the system.


# Developers
1. Sanket Darwante
2. Sumedh Salvi
3. Richa Jha

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

# Project 1 Phases:

## Project Setup Guide
* [Project Setup Instructions](https://github.com/airavata-courses/SuperNova/wiki/Weather-Radar-Project-Setup)

## Functional Specification
* [A Complete Guide For User](https://github.com/airavata-courses/SuperNova/blob/dev-wiki-data/wiki/wiki_images/Functional%20Specification.pdf)

## Phase 2:
* Demo App: http://weatherapp.twilightparadox.com:30000
* CI/CD Jenkin: http://149.165.154.149:8080/job/ADS/
* jetstream instance: supernova_weather_app_instance

## Phase 3: Scalability Report
* [Weather Radar Scalability Testing](https://github.com/airavata-courses/SuperNova/wiki/Project-2:-Weather-Radar-Scalability-Testing)

## Phase 4: MERRA-2 Service Integration
* [Architectural Optimization](https://github.com/airavata-courses/SuperNova/wiki/Architectural-Optimization)
* [MERRA-2 Service Architecture](https://github.com/airavata-courses/SuperNova/blob/dev-wiki-data/wiki/wiki_images/DataAssimilation-MERRA-API.png)

# Project 2: [Custos Case Study](https://github.com/airavata-courses/SuperNova/wiki/Project-4:-Custos-Case-Study)

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
