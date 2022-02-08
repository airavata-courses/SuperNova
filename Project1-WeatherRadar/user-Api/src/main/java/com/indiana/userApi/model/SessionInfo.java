package com.indiana.userApi.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


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

    private String date;

    public SessionInfo(Integer id, Integer userID, String radStation, Date sessionTime, String date) {
        this.id = id;
        this.userID = userID;
        this.radStation = radStation;
        this.sessionTime = sessionTime;
        this.date = date;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}