import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';

import { Route, Router, Routes, useLocation, useNavigate } from 'react-router';
import LoginForm from './LoginForm'
import axios from 'axios';
import './Auth.css';


const Auth = () => {
 
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(false)
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        let url = ''
        // const url = '/teacher/login'
        if (isAdmin) {
            url = '/admin/login'
        } else {
            url = '/teacher/login' 
        }
        axios.post(url, inputs, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('isLoggedIn', true)
            console.log(res.data)
            if (isAdmin) {
                
                navigate('/adminhome')
            } else {
                
                navigate('/')
            }
        })
    }












    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={4.9}

                    padding={3}
                    borderRadius={4}
                    boxShadow={"0px 0px 10px #00000A"}

                    sx={{
                        backgroundColor: '#292F36',
                        ":hover": {
                            boxShadow: "0px 0px 20px #000",
                        },
                        //   fontFamily: 'Ubuntu',
                    }}>
                    <Typography variant="h2" sx={{
                        textShadow: '1px 1px 1px rgba(255,255,255,0.9)', color: 'transparent', backgroundClip: 'text',
                        backgroundColor: '#333333', fontFamily: 'ubuntu', padding: 1
                    }}>Login</Typography>

                    <Box
                        display="flex"
                        // paddingLeft={3}
                    >
                        <Button
                            className='category-button'
                            onClick={() => {
                                setIsAdmin(false)
                            }}
                            endIcon={<GroupsIcon/>}
                            sx={{ padding: "20px", width: "auto", color: 'white' }} >Teacher</Button>
                        <Button
                            className='category-button'
                            onClick={() => {
                                setIsAdmin(true)
                            }}
                            endIcon={<AccountBoxIcon/>}
                            sx={{ padding: "20px", width: "auto", color: 'white' }}>Admin</Button>

                    
                    </Box>

                    <LoginForm func={handleChange} inputs={inputs} font="white"/>

                    <Button
                        endIcon={<LoginIcon />}
                        type="submit"
                        sx={{
                            marginTop: 3,
                            borderRadius: 1.4,
                            color: "white",
                            backgroundColor: '#292F36'
                        }}
                        variant="contained"

                    >Login</Button>

                </Box>
            </form>
        </div>
    )
}

export default Auth