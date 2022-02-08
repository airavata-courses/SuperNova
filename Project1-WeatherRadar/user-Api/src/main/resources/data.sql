

insert into user_info (id,  user_email) values (101, 'abc@test.com');
insert into session_info (id,userid,rad_station,date,session_time) values (1,101,'KTXH','02-02-2022',CURRENT_TIMESTAMP);
insert into session_info (id,userid,rad_station,date,session_time) values (2,101,'KIND','06-02-2022',CURRENT_TIMESTAMP);