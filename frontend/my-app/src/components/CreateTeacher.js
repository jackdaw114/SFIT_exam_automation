
import { useContext, useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { Box, Button, Typography } from '@mui/material';

import { BackgroundContext } from './BackgroundContext';
import axiosInstance from './axiosInstance';

export default function CreateTeacher() {
    const { setCustomBackgroundColor } = useContext(BackgroundContext)
    useEffect(() => {
        setCustomBackgroundColor('#e7f1ef')
    })

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })
    const labels = {
        username: "username",
        password: "password",
    }
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }

    const handleSubmit = () => {
        axiosInstance.post('/admin/addteacher', inputs, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            alert('Teacher added to database!')
        }).catch(err => {
            console.log(err)
        })
    }
    // console.log('this is create teacher')
    return (
        <>
            <div className=' mt-10 flex justify-center items-center  px-10 '>
                <div className=' bg-white rounded-xl p-5'>

                    <Box padding={2} display={'flex'} alignItems={'center'} flexDirection={'column'} className="justify-center">
                        <Typography variant='h4' fontFamily='Ubuntu' className='mb-4'>Enter New Teacher Details</Typography>
                        <LoginForm inputs={inputs} func={handleChange} labels={labels} font="black" />
                        <Button variant='contained' onClick={handleSubmit} >ADD</Button>
                    </Box>
                </div>
            </div>
        </>
    )
}