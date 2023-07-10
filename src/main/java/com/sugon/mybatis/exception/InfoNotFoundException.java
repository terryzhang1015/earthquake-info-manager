package com.sugon.mybatis.exception;

public class InfoNotFoundException extends Exception {
    public InfoNotFoundException(int id) {
        super("id=" + String.valueOf(id));
    }
}
