# stage 1: build
FROM node

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# stage 2: deploy
FROM nginx

COPY --from=build-step /app/docs  /user/share/nginx/html
