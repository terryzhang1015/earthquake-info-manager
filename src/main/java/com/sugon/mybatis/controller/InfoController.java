package com.sugon.mybatis.controller;

import java.io.IOException;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sugon.mybatis.entity.Checkpoint;
import com.sugon.mybatis.entity.Info;
import com.sugon.mybatis.entity.Response;
import com.sugon.mybatis.exception.IdInvalidException;
import com.sugon.mybatis.exception.ParamFormatException;
import com.sugon.mybatis.service.CheckpointService;
import com.sugon.mybatis.service.InfoService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


// @Controller // can return jsx, html
@RestController // convert return value to JSON for RESTful service
// @RequestMapping("/info")
public class InfoController {
    @Autowired
    CheckpointService pointService;
    @Autowired
    InfoService infoService;

    @RequestMapping("/pointview")
    public void wtf(HttpServletRequest request, HttpServletResponse response) throws Exception {
        request.getRequestDispatcher("index.html").forward(request, response);
    }

    @PostMapping("/info")
    public Response addInfo(@RequestBody Info info) throws
            ParamFormatException, IdInvalidException, Exception {
        return Response.success(infoService.addInfo(info));
    }

    @PostMapping("/info/add-from-file")
    public Response addListofInfo(@RequestBody MultipartFile file) throws
            IOException, InvalidFormatException,
            ParamFormatException, IdInvalidException, Exception {
        return Response.success(infoService.addInfoFromFile(file));
    }

    @GetMapping("/info")
    public Response getAllInfo() throws Exception {
        return Response.success(infoService.getAllInfo());
    }

    @GetMapping("/info/{id}")
    public Response getInfoById(@PathVariable int id)
            throws IdInvalidException, Exception {
        return Response.success(infoService.getInfoById(id));
    }

    @GetMapping("/info/filter")
    public Response getFilteredInfo(
                @RequestParam(name = "st",
                        defaultValue = "1000-01-01 00:00:00") String st,
                @RequestParam(name = "ed",
                        defaultValue = "9999-12-31 23:59:59") String ed,
                @RequestParam(name = "d1", defaultValue = "0") String d1,
                @RequestParam(name = "d2", defaultValue = "11") String d2,
                @RequestParam(name = "key", defaultValue = "0") String key
            ) throws ParamFormatException, Exception {
        return Response.success(infoService.getFilteredInfo(st, ed, d1, d2, key));
    }

    @GetMapping("/info/danger/{id}")
    public Response getDangerPointsById(@PathVariable int id)
            throws IdInvalidException {
        return Response.success(infoService.getDangerPointsById(id));
    }

    @PutMapping("/info")
    public Response updateInfo(@RequestBody Info info)
            throws ParamFormatException, IdInvalidException, Exception {
        return Response.success(infoService.updateInfo(info));
    }

    @DeleteMapping("/info/{id}")
    public Response deleteInfoById(@PathVariable int id)
            throws Exception {
        return Response.success(infoService.deleteInfoById(id));
    }

    @DeleteMapping("/info/filter")
    public Response clear(
        @RequestParam(name = "st", defaultValue = "1000-01-01 00:00:00") String st,
        @RequestParam(name = "ed", defaultValue = "9999-12-31 23:59:59") String ed,
        @RequestParam(name = "d1", defaultValue = "0") String d1,
        @RequestParam(name = "d2", defaultValue = "11") String d2
    ) throws ParamFormatException, Exception {
        return Response.success(infoService.clear(st, ed, d1, d2));
    }

    @PostMapping("/point")
    public Response addPoints(@RequestBody Checkpoint point)
            throws ParamFormatException, IdInvalidException, Exception {
        return Response.success(pointService.addPoint(point));
    }

    @GetMapping("/point")
    public Response getAllPoints() throws Exception {
        return Response.success(pointService.getAllPoints());
    }

    @GetMapping("/point/danger")
    public Response getAllDangerPoints() throws Exception {
        return Response.success(pointService.getAllDangerPoints());
    }

    @GetMapping("/point/closest/{id}")
    public Response getClosestInfo(@PathVariable int id)
            throws IdInvalidException, Exception {
        return Response.success(pointService.getClosestInfo(id));
    }

    @PutMapping("/point")
    public Response updatePoint(@RequestBody Checkpoint point)
            throws ParamFormatException, IdInvalidException, Exception {
        return Response.success(pointService.updatePoint(point));
    }

    @DeleteMapping("/point/{id}")
    public Response deletePointById(@PathVariable int id)
            throws IdInvalidException, Exception {
        return Response.success(pointService.deletePointById(id));
    }

    @DeleteMapping("/point")
    public Response clear() throws Exception {
        return Response.success(pointService.clear());
    }
}