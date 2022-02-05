package com.indiana.userApi.controller;

import com.indiana.userApi.model.SessionInfo;
import com.indiana.userApi.model.SessionRequestInfo;
import com.indiana.userApi.repository.SessionInfoRepository;
import com.indiana.userApi.repository.UserInfoRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.indiana.userApi.model.UserInfo;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/userApi")
public class WeatherController {

	@Autowired
	private UserInfoRespository userInfoRespository;


	@Autowired
	private SessionInfoRepository sessionInfoRepository;


	@GetMapping("/sessionInfo")
	public List<SessionInfo> getUserDetails(@RequestParam String emailAddress){
		UserInfo user = userInfoRespository.findByEmailAddress(emailAddress).get(0);
		List<SessionInfo> userSessionInfo = new ArrayList<>();
		if(user != null) {
			userSessionInfo = sessionInfoRepository.findAllByUserID(user.getId());
		}
		return userSessionInfo;
	  }



    @PostMapping("/userQuery")
    public ResponseEntity<String> updateSessionInfo(@RequestBody SessionRequestInfo sessionRequestInfo
                          )  {


		List<UserInfo> userInfo = userInfoRespository.findByEmailAddress(sessionRequestInfo.getEmailAddress()) ;

		if (userInfo.size() == 0) {



			UserInfo newUserInfo = new UserInfo();
			newUserInfo.setUserEmail(sessionRequestInfo.getEmailAddress());
			newUserInfo = userInfoRespository.save(newUserInfo);

			SessionInfo sessionInfo = new SessionInfo();
			sessionInfo.setSessionTime(new Timestamp(System.currentTimeMillis()));
			sessionInfo.setDateTime(Calendar.getInstance());
			sessionInfo.setRadStation(sessionRequestInfo.getRadStation());
			sessionInfo.setUserID(newUserInfo.getId());
			sessionInfo = sessionInfoRepository.save(sessionInfo);




			return new ResponseEntity<>("Success", HttpStatus.OK);


		}

		UserInfo userDetail = userInfo.get(0) ;

		SessionInfo sessionInfo = new SessionInfo();
		sessionInfo.setSessionTime(new Timestamp(System.currentTimeMillis()));
		sessionInfo.setDateTime(Calendar.getInstance());
		sessionInfo.setRadStation(sessionRequestInfo.getRadStation());
		sessionInfo.setUserID(userDetail.getId());

//		SessionInfo sessionInfo = new SessionInfo(0,userDetail.getId(), sessionRequestInfo.getRadStation(), new Timestamp(System.currentTimeMillis()), Calendar.getInstance()) ;
		sessionInfo = sessionInfoRepository.save(sessionInfo);

		return new ResponseEntity<>("Success", HttpStatus.OK);


		    }


}
