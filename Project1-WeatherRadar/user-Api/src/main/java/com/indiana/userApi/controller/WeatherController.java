package com.indiana.userApi.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.indiana.userApi.model.SessionInfo;
import com.indiana.userApi.model.SessionRequestInfo;
import com.indiana.userApi.model.UserInfo;
import com.indiana.userApi.repository.SessionInfoRepository;
import com.indiana.userApi.repository.UserInfoRespository;

@RestController
@RequestMapping("/userApi")
@CrossOrigin
public class WeatherController {

	@Autowired
	private UserInfoRespository userInfoRespository;


	@Autowired
	private SessionInfoRepository sessionInfoRepository;


	@GetMapping("/sessionInfo")
	public List<SessionInfo> getUserDetails(@RequestParam String emailAddress) {
		
		List<SessionInfo> userSessionInfo = new ArrayList<>();
		List<UserInfo> users = userInfoRespository.findByEmailAddress(emailAddress);
		
		if(users.size() > 0) {
			userSessionInfo = sessionInfoRepository.findAllByUserID(users.get(0).getId());
		}
		return userSessionInfo;
	  }



    @PostMapping("/userQuery")
    public ResponseEntity<String> updateSessionInfo(@RequestBody SessionRequestInfo sessionRequestInfo)  {


		List<UserInfo> userInfo = userInfoRespository.findByEmailAddress(sessionRequestInfo.getEmailAddress()) ;

		if (userInfo.size() == 0) {



			UserInfo newUserInfo = new UserInfo();
			newUserInfo.setUserEmail(sessionRequestInfo.getEmailAddress());
			newUserInfo = userInfoRespository.save(newUserInfo);

			SessionInfo sessionInfo = new SessionInfo();
			sessionInfo.setSessionTime(new Timestamp(System.currentTimeMillis()));
			sessionInfo.setDate(sessionRequestInfo.getDate());
			sessionInfo.setRadStation(sessionRequestInfo.getRadStation());
			sessionInfo.setUserID(newUserInfo.getId());
			sessionInfo = sessionInfoRepository.save(sessionInfo);




			return new ResponseEntity<>("Success", HttpStatus.OK);


		}

		UserInfo userDetail = userInfo.get(0) ;

		SessionInfo sessionInfo = new SessionInfo();
		sessionInfo.setSessionTime(new Timestamp(System.currentTimeMillis()));
		sessionInfo.setDate(sessionRequestInfo.getDate());
		sessionInfo.setRadStation(sessionRequestInfo.getRadStation());
		sessionInfo.setUserID(userDetail.getId());
		sessionInfo = sessionInfoRepository.save(sessionInfo);

		return new ResponseEntity<>("Success", HttpStatus.OK);


	}


}
