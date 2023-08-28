import { useEffect, useState } from "react";
import { read, utils, write, writeFile } from 'xlsx';
import { saveAs } from 'file-saver'


import { useCallback } from 'react';
import axios from "axios";
/* get state data and export to XLSX */


export function ExcelSend(jsonData, teacher_name, marks_type, url) {
    const sheet = utils.json_to_sheet(jsonData, { header: Object.keys(jsonData[0]) }).slice(1)
    console.log(sheet)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, sheet, 'sheet1')
    const binaryString = write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary',
    });
    axios.post(url, {
        sheet: binaryString,
        marks_type: marks_type,
        teacher_name: teacher_name,
    }, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })
}



export default function Excel() {



    const handelSubmit = async (e) => {

        // THIS IS THE ENTIRE PROCESS FROM DECODING EXCEL TO RECOMPILING THE EXCEL FILE FOR REFERENCE DO NOT CHANGE
        e.preventDefault()
        const file = e.target.files[0]

        const data = await file.arrayBuffer();
        const workbook = read(data)

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData = utils.sheet_to_json(worksheet, {
            header: [...utils.sheet_to_json(worksheet, { header: 1 })[0]]
        });

        const finalJson = jsonData.slice(1)

        const sheetcon = utils.json_to_sheet(finalJson, {
            header: [...utils.sheet_to_json(worksheet, { header: 1 })[0]]
        })


        let wb = utils.book_new()

        utils.book_append_sheet(wb, sheetcon, 'Sheet1');
        const ab = write(wb, {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary',
        });
        let wb2 = read(ab)
        console.log(ab)
        //writeFile(wb, 'test.xlsx')
    }




    return (<div className="dashboardRow">

        <div>
            <b>Import Excel File:</b>
            <div>
                <input type="file" className="fileSelect"
                    onChange={(e) => handelSubmit(e)} />
            </div>
        </div>
    </div>
    )
}