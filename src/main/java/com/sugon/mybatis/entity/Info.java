package com.sugon.mybatis.entity;

import lombok.Data;

@Data
public class Info {
    private int id;
    private String time;
    private double lat;
    private double lon;
    private int deep;
    private double level;
    private String position;

    public Info(int id, String time, double lat, double lon, int deep,
            double level, String position) {
        this.id = id; this.time = new String(time);
        this.lat = lat; this.lon = lon;
        this.deep = deep; this.level = level;
        this.position = position != null ? new String(position) : null;
    }
}