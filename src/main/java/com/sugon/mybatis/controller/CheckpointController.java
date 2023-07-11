package com.sugon.mybatis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sugon.mybatis.entity.Checkpoint;
import com.sugon.mybatis.entity.Response;
import com.sugon.mybatis.exception.IdInvalidException;
import com.sugon.mybatis.exception.ParamFormatException;
import com.sugon.mybatis.service.CheckpointService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/point")
public class CheckpointController {
    @Autowired
    CheckpointService pointService;

    @PostMapping
    public Response addPoints(@RequestBody Checkpoint point)
            throws ParamFormatException, IdInvalidException, Exception {
        return Response.success(pointService.addPoint(point));
    }

    @GetMapping
    public Response getAllPoints() throws Exception {
        return Response.success(pointService.getAllPoints());
    }

    @GetMapping("/danger")
    public Response getAllDangerPoints() throws Exception {
        return Response.success(pointService.getAllDangerPoints());
    }

    @GetMapping("/closest/{id}")
    public Response getClosestInfo(@PathVariable int id)
            throws IdInvalidException, Exception {
        return Response.success(pointService.getClosestInfo(id));
    }

    @PutMapping
    public Response updatePoint(@RequestBody Checkpoint point)
            throws ParamFormatException, IdInvalidException, Exception {
        return Response.success(pointService.updatePoint(point));
    }

    @DeleteMapping("/{id}")
    public Response deletePointById(@PathVariable int id)
            throws IdInvalidException, Exception {
        return Response.success(pointService.deletePointById(id));
    }

    @DeleteMapping
    public Response clear() throws Exception {
        return Response.success(pointService.clear());
    }
}
