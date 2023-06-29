package com.sugon.mybatis.entity;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class XLSXHandler {
    private XSSFWorkbook workbook;

    public XLSXHandler(File file) throws IOException, InvalidFormatException {
        workbook = new XSSFWorkbook(file);
    }

    public List<Info> getInfoFromSheet() {
        List<Info> ret = new ArrayList<>();
        XSSFSheet sheet = workbook.getSheetAt(0);
        int rowCnt = sheet.getLastRowNum();
        for (int i = 1; i <= rowCnt; ++i) {
            Row row = sheet.getRow(i);
            ret.add(new Info(
                (int)row.getCell(0).getNumericCellValue(),
                String.valueOf(row.getCell(1)),
                row.getCell(2).getNumericCellValue(),
                row.getCell(3).getNumericCellValue(),
                (int)row.getCell(4).getNumericCellValue(),
                row.getCell(5).getNumericCellValue(),
                String.valueOf(row.getCell(6))
            ));
        }
        return ret;
    }
}