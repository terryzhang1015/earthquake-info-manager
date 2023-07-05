package com.sugon.mybatis.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sugon.mybatis.entity.Info;

@Repository
public interface InfoMapper {
    int addInfo(Info info);
    List<Info> getAllInfo();
    List<Info> getInfoBetweenTimes(String st, String ed);
    List<Info> getInfoBetweenLevels(int d1, int d2);
    Info getInfoById(int id);
    int deleteInfo(int id);
    int updateInfo(Info info);
    int clear();
}