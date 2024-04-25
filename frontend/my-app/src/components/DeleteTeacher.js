
import { useState } from 'react';
import LoginForm from './LoginForm';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function DeleteTeacher() {
    const [inputs, setInputs] = useState({
        username: ""
    })

    const labels = {
        username: "username",
    }
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }

    const handleSubmit = () => {

        axios.post('/admin/deleteteacher', inputs, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            if (res.status == 500)
                alert('Duplicate Record found. Please enter a unique userid')
            else if (res.status == 200)
                alert('teacher deleted from database!')
            else
                alert('Record not found')
        })
    }
    // console.log('this is create teacher')
    return (
        <>
            <div className=' flex justify-center items-center  px-10 '>
                <div className=' bg-white rounded-xl p-5'>
                    <Box padding={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <Typography variant='h4' fontFamily='Ubuntu'>Enter Teacher Details</Typography>
                        <LoginForm inputs={inputs} func={handleChange} font="black" labels={labels} />
                        <Button variant='contained' onClick={handleSubmit} color='warning' >Delete</Button>
                    </Box>
                </div>
            </div>
        </>
    )
}