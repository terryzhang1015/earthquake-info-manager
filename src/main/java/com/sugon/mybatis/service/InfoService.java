package com.sugon.mybatis.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sugon.mybatis.entity.Info;
import com.sugon.mybatis.entity.XLSXHandler;
import com.sugon.mybatis.mapper.InfoMapper;

@Service
public class InfoService {
    @Autowired
    InfoMapper infoMapper;

    @Value("${paths.temp-path}") // CANNOT use 'new' to create InfoService objects
    private String path;

    public int addInfo(Info info) { return infoMapper.addInfo(info); }
    public int addInfoFromFile(MultipartFile file) throws
            IOException, InvalidFormatException {
        System.out.println(path);
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
    public List<Info> getFilteredInfo(String st, String ed, String d1, String d2) {
        return infoMapper.getFilteredInfo(st, ed, d1, d2);
    }
    public Info getInfoById(int id) { return infoMapper.getInfoById(id); }
    public int updateInfo(Info info) { return infoMapper.updateInfo(info); }
    public int delete(int id) { return infoMapper.deleteInfo(id); }
    public int clear() { return infoMapper.clear(); }
}