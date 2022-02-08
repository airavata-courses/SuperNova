# stage 1: build
FROM adoptopenjdk/openjdk15:ubi

ENV APP_HOME=/usr/app/

WORKDIR $APP_HOME

COPY target/*jar app.jar

EXPOSE 4700

CMD ["java","-jar","app.jar"]

