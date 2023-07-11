package com.sugon.mybatis.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sugon.mybatis.entity.Checkpoint;
import com.sugon.mybatis.entity.Info;
import com.sugon.mybatis.entity.XLSXHandler;
import com.sugon.mybatis.exception.IdInvalidException;
import com.sugon.mybatis.exception.ParamFormatException;
import com.sugon.mybatis.mapper.InfoMapper;

@Service
public class InfoService {
    private double eps = 1e-6;

    private boolean checkTime(String str) {
        String validRegex =
        "^(?:(?:[1-9]\\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|" +
        "(?!3200)(?:[1-9]\\d(?:(?!00)[02468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29) " +
        "(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d)$";
        return str.matches(validRegex);
    }

    private boolean checkLevel(String str) {
        String validRegex = "^(\\d*(\\.\\d*)?)$";
        return str.length() > 0 && str.matches(validRegex);
    }

    private void validateFilter(String st, String ed, String d1, String d2)
            throws ParamFormatException {
        if (!checkTime(st)) throw new ParamFormatException("st");
        if (!checkTime(ed)) throw new ParamFormatException("ed");
        if (!checkLevel(d1)) throw new ParamFormatException("d1");
        if (!checkLevel(d2)) throw new ParamFormatException("d2");
    }

    private void validateInfo(Info info) throws ParamFormatException {
        if (!checkTime(info.getTime()))
            throw new ParamFormatException("Info.time");
        if (Math.abs(info.getLat()) - eps > 90)
            throw new ParamFormatException("Info.lat");
        if (Math.abs(info.getLon()) - eps > 180)
            throw new ParamFormatException("Info.lon");
        if (info.getLevel() + eps < 0 || info.getLevel() - eps > 9.9)
            throw new ParamFormatException("Info.level");
        if (info.getPosition() != null && info.getPosition().length() > 120)
            throw new ParamFormatException("Info.position");
    }

    @Autowired
    InfoMapper infoMapper;

    @Value("${paths.temp-path}") // CANNOT use 'new' to create InfoService objects
    private String path;

    public int addInfo(Info info) throws ParamFormatException, IdInvalidException {
        validateInfo(info);
        if (infoMapper.countId(info.getId()) > 0)
            throw new IdInvalidException(info.getId());
        return infoMapper.addInfo(info);
    }

    public int addInfoFromFile(MultipartFile file) throws
            IOException, InvalidFormatException,
            ParamFormatException, IdInvalidException {
        File temp = new File(path);
        if (!temp.exists()) temp.mkdirs();
        File localFile = new File(temp.getAbsolutePath() + file.getOriginalFilename());
        file.transferTo(localFile);
        XLSXHandler xlsxHandler = new XLSXHandler(localFile);
        int successCnt = 0;
        List<Info> infoList = xlsxHandler.getInfoFromSheet();
        for (Info i : infoList)
            if (addInfo(i) == 1)
                ++successCnt;
        return successCnt;
    }

    public List<Info> getAllInfo() { return infoMapper.getAllInfo(); }

    public List<Info> getFilteredInfo(String st, String ed, String d1,
            String d2, String key) throws ParamFormatException {
        validateFilter(st, ed, d1, d2);
        if (key.equals("1"))
            return infoMapper.getFilteredInfo(st, ed, d1, d2, "Time");
        if (key.equals("2"))
            return infoMapper.getFilteredInfo(st, ed, d1, d2, "Level");
        return infoMapper.getFilteredInfo(st, ed, d1, d2, "Id");
    }

    public Info getInfoById(int id) throws IdInvalidException {
        Info ret = infoMapper.getInfoById(id);
        if (ret == null) throw new IdInvalidException(id);
        return ret;
    }

    public List<Checkpoint> getDangerPointsById(int id) throws IdInvalidException {
        if (infoMapper.countId(id) != 1)
            throw new IdInvalidException(id);
        return infoMapper.getDangerPointsById(id);
    }

    public int updateInfo(Info info) throws ParamFormatException, IdInvalidException {
        validateInfo(info);
        if (infoMapper.updateInfo(info) != 1)
            throw new IdInvalidException(info.getId());
        return 1;
    }

    public int deleteInfoById(int id) throws IdInvalidException {
        if (infoMapper.deleteInfoById(id) != 1)
            throw new IdInvalidException(id);
        return 1;
    }

    public int clear(String st, String ed, String d1, String d2)
            throws ParamFormatException {
        validateFilter(st, ed, d1, d2);
        return infoMapper.clear(st, ed, d1, d2);
    }
}