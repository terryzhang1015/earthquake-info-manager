package com.sugon.mybatis.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.sugon.mybatis.entity.Checkpoint;
import com.sugon.mybatis.entity.Info;

@Repository
public interface CheckpointMapper {
    int addPoint(Checkpoint point);
    List<Checkpoint> getAllPoints();
    List<Checkpoint> getAllDangerPoints();
    Info getClosestInfo(int id);
    int countId(int id);
    int updatePoint(Checkpoint point);
    int deletePointById(int id);
    int clear();
}
