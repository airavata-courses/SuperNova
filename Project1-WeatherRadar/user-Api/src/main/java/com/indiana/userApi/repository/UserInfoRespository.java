package com.indiana.userApi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.indiana.userApi.model.UserInfo;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserInfoRespository extends JpaRepository<UserInfo, Integer>{


    @Query("select s from UserInfo s where s.userEmail = :name")
    List<UserInfo> findByEmailAddress(String name);


//    @SuppressWarnings("unused")
//    public List<UserInfo> doSomeHql(Long id) {
//        String hql = "SELECT eFROM MyEntity e WHERE e.id = :id";
//        TypedQuery<UserInfo> query = entityManager.createQuery(hql, MyEntity.class);
//        query.setParameter("id", id);
//        return query.getResultList();
//    }

    //User getById(Integer id);

}
