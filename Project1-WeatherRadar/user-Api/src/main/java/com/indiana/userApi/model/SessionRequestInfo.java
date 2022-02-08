package com.indiana.userApi.model;


import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionRequestInfo implements Serializable {


    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	private String emailAddress;
    public String getEmailAddress() {
        return emailAddress;
    }
    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
    public String getRadStation() {
        return radStation;
    }
    public void setRadStation(String radStation) {
        this.radStation = radStation;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    private String radStation;
   

    private String date;



}