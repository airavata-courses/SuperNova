package com.indiana.userApi.repository;

import com.indiana.userApi.model.SessionInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionInfoRepository extends JpaRepository<SessionInfo, Integer>{

    //User getById(Integer id);

}