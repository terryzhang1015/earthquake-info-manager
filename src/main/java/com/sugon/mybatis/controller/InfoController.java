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

import com.sugon.mybatis.entity.Info;
import com.sugon.mybatis.entity.Response;
import com.sugon.mybatis.service.InfoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


// @Controller // can return jsx, html
@RestController // convert return value to JSON for RESTful service
@RequestMapping("/info")
public class InfoController {
    @Autowired
    InfoService infoService;

    @PostMapping
    public Response addInfo(@RequestBody Info info) throws Exception {
        return Response.success(infoService.addInfo(info));
    }

    @PostMapping("/add-from-file")
    public Response addListofInfo(@RequestBody MultipartFile file) throws
            IOException, InvalidFormatException, Exception {
        return Response.success(infoService.addInfoFromFile(file));
    }

    @GetMapping
    public Response getAllInfo() throws Exception {
        return Response.success(infoService.getAllInfo());
    }

    @GetMapping("/{id}")
    public Response getInfoById(@PathVariable int id) throws Exception {
        return Response.success(infoService.getInfoById(id));
    }

    @GetMapping("/filter")
    public Response getFilteredInfo(
                @RequestParam(name = "st", defaultValue = "1000-01-01 00:00:00") String st,
                @RequestParam(name = "ed", defaultValue = "9999-12-31 23:59:59") String ed,
                @RequestParam(name = "d1", defaultValue = "0") String d1,
                @RequestParam(name = "d2", defaultValue = "11") String d2
            ) throws Exception {
        return Response.success(infoService.getFilteredInfo(st, ed, d1, d2));
    }

    @PutMapping
    public Response updateInfo(@RequestBody Info info) throws Exception {
        return Response.success(infoService.updateInfo(info));
    }

    @DeleteMapping("/{id}")
    public Response deleteInfo(@PathVariable int id) throws Exception {
        return Response.success(infoService.delete(id));
    }

    @DeleteMapping
    public Response clear() throws Exception {
        return Response.success(infoService.clear());
    }
}