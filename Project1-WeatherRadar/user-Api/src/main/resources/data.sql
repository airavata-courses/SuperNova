

insert into user_info (id,  user_email) values (101, 'abc@test.com');
insert into session_info (id,userid,rad_station,data_type,date,session_time) values (1,101,'KTXH','NexRAD','02-02-2022',CURRENT_TIMESTAMP);
insert into session_info (id,userid,rad_station,data_type,date,session_time) values (2,101,'KIND','Merra-2','06-02-2022',CURRENT_TIMESTAMP);