package com.sugon.mybatis.exception;

public class ParamFormatException extends Exception {
    public ParamFormatException(String param) {
        super(param);
    }
}
