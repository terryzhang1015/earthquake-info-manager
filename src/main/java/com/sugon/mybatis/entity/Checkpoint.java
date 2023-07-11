package com.sugon.mybatis.entity;

import lombok.Data;

@Data
public class Checkpoint {
    private int id;
    private double lat;
    private double lon;
    private String position;

    public Checkpoint(int id, double lat, double lon, String position) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.position = position != null ? new String(position) : null;
    }
}
