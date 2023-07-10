package com.sugon.mybatis.exception;

public class InfoIdInvalidException extends Exception {
    public InfoIdInvalidException(int id) {
        super(String.valueOf(id));
    }
}
