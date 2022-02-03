package com.indiana.userApi.controller;

import com.indiana.userApi.model.SessionInfo;
import com.indiana.userApi.model.SessionRequestInfo;
import com.indiana.userApi.repository.SessionInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.indiana.userApi.model.UserInfo;
import com.indiana.userApi.repository.UserInfoRespository;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/sessioninfo")
public class WeatherController {

	@Autowired
	private UserInfoRespository userInfoRespository;


	@Autowired
	private SessionInfoRepository sessionInfoRepository;


	@GetMapping("/{id}")
	public UserInfo getBookDetails(@PathVariable("id") Integer id){
		UserInfo user = userInfoRespository.findById(id).get();
		return user;
	  }

//	@GetMapping("/{id}")
//	public SessionInfo getBookDetails(@PathVariable("id") Integer id){
//		SessionInfo user = sessionInfoRepository.findById(id).get();
//		return user;
//	  }


//	@GetMapping("/{id}")
//	public UserInfo getWeatherDeatils(@PathVariable("id") Integer id){
//		//  return userInfoRespository.getById(id);
//		return userInfoRespository.findByemailId("abs");
//
//	}



    @PostMapping("/")
    public ResponseEntity<String> updateNote(@RequestBody SessionRequestInfo sessionRequestInfo
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
			sessionInfo.setUserId(newUserInfo.getId());
			sessionInfo = sessionInfoRepository.save(sessionInfo);


//			SessionInfo sessionInfo = new SessionInfo(0,0, sessionRequestInfo.getEmailAddress(), null,new Calendar()) ;
//			sessionInfo = sessionInfoRepository.save(sessionInfo);


			return new ResponseEntity<>("Success", HttpStatus.OK);


		}

		UserInfo userDetail = userInfo.get(0) ;

		SessionInfo sessionInfo = new SessionInfo();
		sessionInfo.setSessionTime(new Timestamp(System.currentTimeMillis()));
		sessionInfo.setDateTime(Calendar.getInstance());
		sessionInfo.setRadStation(sessionRequestInfo.getRadStation());
		sessionInfo.setUserId(userDetail.getId());

//		SessionInfo sessionInfo = new SessionInfo(0,userDetail.getId(), sessionRequestInfo.getRadStation(), new Timestamp(System.currentTimeMillis()), Calendar.getInstance()) ;
		sessionInfo = sessionInfoRepository.save(sessionInfo);

		return new ResponseEntity<>("Success", HttpStatus.OK);


		    }


}
