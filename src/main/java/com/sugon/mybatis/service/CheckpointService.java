package com.sugon.mybatis.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sugon.mybatis.entity.Checkpoint;
import com.sugon.mybatis.entity.Info;
import com.sugon.mybatis.exception.IdInvalidException;
import com.sugon.mybatis.exception.ParamFormatException;
import com.sugon.mybatis.mapper.CheckpointMapper;

@Service
public class CheckpointService {
    private double eps = 1e-6;

    private void validatePoint(Checkpoint point) throws ParamFormatException {
        if (Math.abs(point.getLat()) - eps > 90)
            throw new ParamFormatException("Info.lat");
        if (Math.abs(point.getLon()) - eps > 180)
            throw new ParamFormatException("Info.lon");
        if (point.getPosition() != null && point.getPosition().length() > 120)
            throw new ParamFormatException("Info.position");
    }
    
    @Autowired
    CheckpointMapper pointMapper;

    public int addPoint(Checkpoint point)
            throws ParamFormatException, IdInvalidException {
        validatePoint(point);
        if (pointMapper.countId(point.getId()) > 0)
            throw new IdInvalidException(point.getId());
        return pointMapper.addPoint(point);
    }

    public List<Checkpoint> getAllPoints() {
        return pointMapper.getAllPoints();
    }

    public List<Checkpoint> getAllDangerPoints() {
        return pointMapper.getAllDangerPoints();
    }

    public Info getClosestInfo(int id) throws IdInvalidException {
        if (pointMapper.countId(id) != 1)
            throw new IdInvalidException(id);
        return pointMapper.getClosestInfo(id);
    }

    public int updatePoint(Checkpoint point)
            throws ParamFormatException, IdInvalidException {
        validatePoint(point);
        if (pointMapper.updatePoint(point) != 1)
            throw new IdInvalidException(point.getId());
        return 1;
    }

    public int deletePointById(int id) throws IdInvalidException {
        if (pointMapper.deletePointById(id) != 1)
            throw new IdInvalidException(id);
        return 1;
    }

    public int clear() {
        return pointMapper.clear();
    }
}
