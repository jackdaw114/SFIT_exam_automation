
import { useState } from 'react';
import LoginForm from './LoginForm';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function CreateTeacher() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        subject:""
    })
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }

    const handleSubmit = () => {
        axios.post('/admin/addteacher', inputs, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            if (res.status == 500)
                alert('Duplicate Record found. Please enter a unique userid')
            else
                alert('teacher added to database!')
        })
    }
    // console.log('this is create teacher')
    return (
        <>
            <Box padding={2} marginTop={15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <Typography variant='h4' fontFamily='Ubuntu'>Enter New Teacher Details</Typography>
                <LoginForm inputs={inputs} func={handleChange} font="black" />
                <Button variant='contained' onClick={handleSubmit}>ADD</Button>
                </Box>
            </>
    )
}