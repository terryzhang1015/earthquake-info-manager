package com.sugon.mybatis.entity;

public class Response {
    private int code;
    private String msg;
    private Object data;

    public Response(int code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public void setCode(int code) { this.code = code; }
    public void setMsg(String msg) { this.msg = msg; }
    public void setData(Object data) { this.data = data; }

    public int getCode() { return code; }
    public String getMsg() { return msg; }
    public Object getData() { return data; }

    public static Response success(Object data) {
        return new Response(200, "success", data);
    }
    public static Response failure(int errCode, String errMsg) {
        return new Response(errCode, errMsg, null);
    }
}
