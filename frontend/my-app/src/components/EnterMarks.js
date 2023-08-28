
import { Typography, Box, Button } from '@mui/material';
import Header from './Header';
import NewSheet from './NewSheet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { read, utils, write } from 'xlsx';


const postFunc = (inputs) => {

    axios.post('/teacher/updatemarks', { xlsx: inputs }, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    }).then(res => {
        alert('updated')
    })
}

export default function EnterMarks() {
    const [tableData, setTableData] = useState([{}]);
    useEffect(() => {
        axios.get('/teacher/getmarks').then((res) => {
            console.log(res)
            const workbook = read(res.data)
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            const jsonData = utils.sheet_to_json(worksheet, {
                header: [...utils.sheet_to_json(worksheet, { header: 1 })[0]]
            });
            console.log(jsonData)
            setTableData(jsonData)
        }).catch((err) => {
            console.log(err)
        })
    }, []);
    const childToParent = (info) => {
        setTableData(info)
    }
    const handleSubmit = (e) => {
        const sheetcon = utils.json_to_sheet(tableData, {
            header: [...utils.sheet_to_json(Object.keys(tableData[0]), { header: 1 })[0]]
        })


        let wb = utils.book_new()

        utils.book_append_sheet(wb, sheetcon, 'Sheet1');
        const ab = write(wb, {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary'
        });
        console.log(ab)
        postFunc(wb)
    }

    return (
        <>
            <Box className='h_background' sx={{ flexGrow: 1, minHeight: '100vh' }}>
                <Header />
                <NewSheet tableData={tableData} func={childToParent} />
                <Button onClick={handleSubmit} >submit</Button>
            </Box>
        </>
    )
}