package com.indiana.userApi.model;

import java.io.Serializable;

import javax.persistence.*;


@Entity
@Table( name = "userInfo" )
public class UserInfo implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2765339563414172599L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column
	private String userEmail;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public UserInfo() {
	}
	
	public UserInfo(Integer id, String email) {
		super();
		this.id = id;
		this.userEmail = email;
	}

}