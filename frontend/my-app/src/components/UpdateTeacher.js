
import { useState } from 'react';
import LoginForm from './LoginForm';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function UpdateTeacher() {
    const [inputs, setInputs] = useState({
        username: "",
        subject: ""
    })
    const labels = {
        username: "username",
        subject: "subject"
    }
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }

    const handleSubmit = () => {
        axios.post('/admin/updateteacher', inputs, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            if (res.status == 200)
                alert('teacher updated!')
            else if (res.status == 201)
                alert('No teacher found')
        })
    }
    // console.log('this is create teacher')
    return (
        <>
            <div className=' mt-10 flex justify-center items-center  px-10 '>
                <div className=' bg-white rounded-xl p-5'>
                    <Box padding={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <Typography variant='h4' fontFamily='Ubuntu'>Update Teacher Details</Typography>
                        <LoginForm inputs={inputs} func={handleChange} labels={labels} font="black" />
                        <Button variant='contained' onClick={handleSubmit} >Update</Button>
                    </Box>
                </div>
            </div>

        </>
    )
}