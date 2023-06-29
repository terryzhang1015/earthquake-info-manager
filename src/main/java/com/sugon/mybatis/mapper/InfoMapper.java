package com.sugon.mybatis.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sugon.mybatis.entity.Info;

@Repository
public interface InfoMapper {
    int addInfo(Info info);
    List<Info> getAllInfo();
    List<Info> get10Info(int start);
    Info getInfoById(int id);
    int deleteInfo(int id);
    int updateInfo(Info info);
    int clear();
}