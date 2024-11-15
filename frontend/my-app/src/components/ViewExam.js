import { useLocation } from "react-router";
import Header from "./Header";
import NewSheet from "./NewSheet";
import { useEffect, useState } from "react";
import axios from "axios";
import { read, utils, write, writeFile } from "xlsx";
import { Box, Button } from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DownloadIcon from '@mui/icons-material/Download';
import axiosInstance from "./axiosInstance";

export default function ViewExam(props) {


    const [tableData, setTableData] = useState()
    const [table2Data, setTable2Data] = useState()
    let location = useLocation();
    console.log(location.state._id)
    const childToParent = (info) => {
        setTableData(info)
        console.log(table2Data)
        console.log('tabel2', tableData)

    }

    useEffect(() => {
        axiosInstance.post('/teacher/excelbyid', { _id: location.state._id }, {// TODO: different query here for getting 3 things subject code , year , class
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log(res.data.sheet)
            const workbook = read(res.data.sheet, { type: 'binary' })
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            console.log(worksheet)
            const jsonData = utils.sheet_to_json(worksheet, {
                header: [...utils.sheet_to_json(worksheet, { header: 1 })[0]]
            });
            // let fullJson = [...jsonData]
            console.log(jsonData)
            setTableData(jsonData)
            setTable2Data(jsonData.slice(1))
        })

    }, [])
    // let id = props.id

    const handleUpdate = () => {
        console.log(tableData)

        const sheet = utils.json_to_sheet(tableData, { header: Object.keys(tableData[0]) })
        console.log(sheet)
        const wb = utils.book_new()
        utils.book_append_sheet(wb, sheet, 'sheet1')
        const binaryString = write(wb, {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary',
        });
        axiosInstance.post('/teacher/updateexcel', {
            _id: location.state._id,
            sheet: binaryString,
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log(res.data)
            alert(res.data)
        })
    }
    // dummy data
    const handleDownload = () => {
        const sheet = utils.json_to_sheet(table2Data, { header: Object.keys(tableData[0]) })
        console.log(sheet)
        const wb = utils.book_new()
        utils.book_append_sheet(wb, sheet, 'sheet1')
        writeFile(wb, 'test.xlsx')
    }
    const handleInput = async (e) => {

        // THIS IS THE ENTIRE PROCESS FROM DECODING EXCEL TO RECOMPILING THE EXCEL FILE FOR REFERENCE DO NOT CHANGE
        e.preventDefault()
        const file = e.target.files[0]

        const data = await file.arrayBuffer();
        const workbook = read(data)
        const binaryString = write(workbook, {
            bookSST: false,
            bookType: 'xlsx',
            type: 'binary'
        })
        // console.log(binary)
        axiosInstance.post('/teacher/updateexcel', {
            _id: location.state._id,
            sheet: binaryString,
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log(res.data)
            alert(res.data)
        })
    }

    return (
        <>
            {/* <Box sx={{display:"flex",alignItems:'center',flexDirection:'column',width:'100vw'}}> */}

            {tableData ? <NewSheet tableData={table2Data} func={childToParent} /> : <></>}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="mb-24">



                <Button variant="contained" color="success" onClick={handleUpdate} className=" mx-14">Update <AutorenewIcon fontSize="small" className=" pl-1" /> </Button>
                <input type="file" className="fileSelect"
                    onChange={(e) => handleInput(e)} />
                <Button variant="contained" onClick={handleDownload} >Download File <DownloadIcon fontSize="small" className="pl-2" /> </Button>
            </Box>


            {/* </Box> */}
        </>
    )
}