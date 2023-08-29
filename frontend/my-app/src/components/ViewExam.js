import { useLocation } from "react-router";
import Header from "./Header";
import NewSheet from "./NewSheet";
import { useEffect, useState } from "react";
import axios from "axios";
import { read, utils, write, writeFile } from "xlsx";
import { Box, Button } from "@mui/material";


export default function ViewExam(props) {

    // let tableData = [
    //   {
    //     "key1": "value1",
    //     "key2": "value2",
    //     "key3": "value3",
    //     "key4": "value4",
    //     "key5": "value5"
    //   },
    //   {
    //     "key1": "value6",
    //     "key2": "value7",
    //     "key3": "value8",
    //     "key4": "value9",
    //     "key5": "value10"
    //   },
    //   {
    //     "key1": "value11",
    //     "key2": "value12",
    //     "key3": "value13",
    //     "key4": "value14",
    //     "key5": "value15"
    //   }
    // ]

    const [tableData, setTableData] = useState()
    const [table2Data, setTable2Data] = useState()
    let location = useLocation();
    console.log(location.state._id)
    const childToParent = (info) => {
        setTableData(info)
        
    }
    
    useEffect(() => {
        axios.post('/teacher/excelbyid', { _id: location.state._id }, {
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
        axios.post('/teacher/updateexcel', {
            _id: location.state._id,
            sheet: binaryString,
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log(res.data)
            })
    }
    // dummy data
    const handleDownload = () => {
        const sheet = utils.json_to_sheet(table2Data, { header: Object.keys(tableData[0]) })
        console.log(sheet)
        const wb = utils.book_new()
        utils.book_append_sheet(wb, sheet, 'sheet1')
       writeFile(wb,'test.xlsx')
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
            type:'binary'
        })
        // console.log(binary)
        axios.post('/teacher/updateexcel', {
            _id: location.state._id,
            sheet: binaryString,
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log(res.data)
            })
    }

    return (
        <>
            <Header />
            {/* <Box sx={{display:"flex",alignItems:'center',flexDirection:'column',width:'100vw'}}> */}

            {tableData ? <NewSheet tableData={table2Data} func={childToParent} /> : <></>}
            <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center'}}>

            

                <Button variant="contained" color="success" onClick={handleUpdate}>Update</Button>
                       <input type="file" className="fileSelect"
                    onChange={(e) => handleInput(e)} />
                <Button variant="contained" onClick={handleDownload} >Download File</Button>
                    </Box>
            

            {/* </Box> */}
        </>
    )
}