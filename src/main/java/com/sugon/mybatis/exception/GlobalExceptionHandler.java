package com.sugon.mybatis.exception;

import java.io.IOException;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sugon.mybatis.entity.Response;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IOException.class)
    @ResponseBody
    public Response ioExceptionResponse(IOException e) {
        return Response.failure(500, "server error: file io");
    }

    @ExceptionHandler(InvalidFormatException.class)
    @ResponseBody
    public Response ifExceptionResponse(InvalidFormatException e) {
        return Response.failure(500, "server error: file format");
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Response exceptionResponse(Exception e) {
        return Response.failure(500, "server error");
    }
}
