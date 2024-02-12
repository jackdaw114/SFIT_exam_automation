
import { Typography, Box } from '@mui/material';
import Header from './Header';
import NewSheet from './NewSheet';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function VerifyEligibility() {


    const [tableData, setTableData] = useState([{}]);
    useEffect(() => {
        axios.get('/teacher/getmarks').then((res) => {
            console.log(res)
            setTableData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, []);
    const childToParent = (info) => {
        setTableData(info)
    }

    return (
        <>
            <Box className='h_background' sx={{ flexGrow: 1, minHeight: '100vh' }}>

                <NewSheet tableData={tableData} func={childToParent} />
            </Box>
        </>
    )
}