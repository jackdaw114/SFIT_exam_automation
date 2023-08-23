
import { Typography, Box, Button } from '@mui/material';
import Header from './Header';
import NewSheet from './NewSheet';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function EnterMarks() {

    const DummyData = [
        { id: 1, name: 'Jason', age: 21, class: 'TEACMPN', hobby: 'coding', pid: 212011 },
        { id: 2, name: 'Aslin', age: 17, class: 'TEACMPN', hobby: 'basketball', pid: 212012 },
        { id: 3, name: 'Nigel', age: 20, class: 'TEACMPN', hobby: 'valorant', pid: 212013 },
        { id: 4, name: 'Callahan', age: 20, class: 'TEACMPN', hobby: 'football', pid: 212014 },
    ]

    const [tableData, setTableData] = useState(DummyData);
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
                <Header />
                <Button sx={{ margin: '15px 15px' }} variant="contained">Create Exam</Button>
                <NewSheet tableData={tableData} func={childToParent} />
            </Box>
        </>
    )
}