package com.indiana.userApi.model;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

import javax.persistence.*;


@Entity
public class SessionInfo implements Serializable{

    /**
     *
     */
    private static final long serialVersionUID = -2765339563414172599L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer userID;

    @Column
    private String radStation;

    @Temporal(TemporalType.TIMESTAMP)
    private Date sessionTime;

    @Temporal(TemporalType.DATE)
    private Calendar dateTime;

    public SessionInfo(Integer id, Integer userID, String radStation, Date sessionTime, Calendar date) {
        this.id = id;
        this.userID = userID;
        this.radStation = radStation;
        this.sessionTime = sessionTime;
        this.dateTime = date;
    }

    public SessionInfo() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getRadStation() {
        return radStation;
    }

    public void setRadStation(String radStation) {
        this.radStation = radStation;
    }

    public Date getSessionTime() {
        return sessionTime;
    }

    public void setSessionTime(Date sessionTime) {
        this.sessionTime = sessionTime;
    }

    public Calendar getDateTime() {
        return dateTime;
    }

    public void setDateTime(Calendar dateTime) {
        this.dateTime = dateTime;
    }
}