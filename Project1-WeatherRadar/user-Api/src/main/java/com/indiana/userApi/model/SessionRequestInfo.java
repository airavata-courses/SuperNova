package com.indiana.userApi.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionRequestInfo implements Serializable {


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
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    private String radStation;
    @DateTimeFormat(pattern="dd/MM/yyyy")
    private Date date;



}