package com.sugon.mybatis.exception;

public class IdInvalidException extends Exception {
    public IdInvalidException(int id) {
        super(String.valueOf(id));
    }
}
