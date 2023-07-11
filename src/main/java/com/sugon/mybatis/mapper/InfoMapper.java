package com.sugon.mybatis.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sugon.mybatis.entity.Checkpoint;
import com.sugon.mybatis.entity.Info;

@Repository
public interface InfoMapper {
    int addInfo(Info info);
    List<Info> getAllInfo();
    List<Info> getFilteredInfo(String st, String ed, String d1, String d2, String key);
    Info getInfoById(int id);
    List<Checkpoint> getDangerPointsById(int id);
    int countId(int id);
    int deleteInfoById(int id);
    int updateInfo(Info info);
    int clear(String st, String ed, String d1, String d2);
}