CREATE DATABASE WeatherRadar;
use WeatherRadar;

create table UserInfo(
  id INT AUTO_INCREMENT,
   userEmail VARCHAR(250) NOT NULL,
   PRIMARY KEY ( id )
);
create table SessionInfo(
   id INT AUTO_INCREMENT,
   userID INT NOT NULL,
   radStation VARCHAR(250),
   dataTime Date,
   sessionTime TIMESTAMP,
   PRIMARY KEY ( id ),
   FOREIGN KEY (userID) REFERENCES UserInfo(id)
);







