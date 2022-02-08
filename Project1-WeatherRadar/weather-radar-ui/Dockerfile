# stage 1: build
FROM node:14.17.6-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

RUN npm install -g @angular/cli

COPY . /app

# RUN npm run build --prod

EXPOSE 4200

# CMD ["npm","start"]
CMD ng serve --host 0.0.0.0

# stage 2: deploy
# FROM nginx:1.17.1-alpine
# EXPOSE 80
# COPY --from=build-step /app/dist/weather-radar-ui  /usr/share/nginx/html
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf

