# stage 1: build
FROM node:14.17.6-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

# RUN npm run build --prod

EXPOSE 4400

CMD npm start

