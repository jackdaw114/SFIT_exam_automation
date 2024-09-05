const express = require('express');

const SyllabusSchema = require('./schemas/SyllabusSchema');
const { writeXLSX, readFile, utils, writeFile } = require('xlsx');
const router = express.Router();


function fitToColumn(arrayOfArray) {
    // get maximum character of each column
    return arrayOfArray[0].map((a, i) => ({ wch: Math.max(...arrayOfArray.map(a2 => a2[i] ? a2[i].toString().length : 0)) }));
}
const func = async () => {
    let wb = await readFile('ExcelTemplates/gazette_temp.xls')
    let ws = wb.Sheets[wb.SheetNames[0]]
    ws['!cols'] = [
        { wch: 50 },
        { wch: 50 },
        { wch: 50 },
        { wch: 50 }
    ];
    let wb2 = utils.book_new()
    utils.book_append_sheet(wb2, ws, 'sheet1')
    writeFile(wb2, 'test2.xls')
    console.log(ws)
}
func()