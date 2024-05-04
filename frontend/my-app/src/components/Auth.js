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

    useEffect(() => {
        const url = ''
        if (localStorage.getItem('isLoggedIn') === true) {
            if (isAdmin) {
                navigate('/home')
            } else {
                navigate('/adminhome')
            }

        }
    })

    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    const handleClick = (isAdmin) => {
        setIsAdmin(isAdmin);
    };

    const labels = {
        username: "username",
        password: "password"
    }
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
            // localStorage.setItem('subjects', JSON.stringify(res.data.subjects))
            localStorage.setItem('isLoggedIn', true)

            console.log(res.data)
            if (isAdmin) {
                localStorage.setItem('isAdmin', true)
                navigate('/adminhome')
            } else {
                localStorage.setItem('isAdmin', false)
                localStorage.setItem('phoneNo', res.data.phoneNo)
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('password', res.data.password)
                navigate('/home')
            }
        })
    }


    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <Box
                    className=" bg-primary"
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={500}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={20}

                    padding={3}
                    borderRadius={4}
                    boxShadow={"0px 0px 10px #00000A"}

                    sx={{
                        // backgroundColor: '#292F36',
                        ":hover": {
                            boxShadow: "0px 0px 20px #000",
                        },
                        //   fontFamily: 'Ubuntu',
                    }}>
                    <Typography variant="h2" sx={{
                        textShadow: '1px 1px 1px rgba(255,255,255,0.9)', color: 'transparent', backgroundClip: 'text',
                        backgroundColor: '#333333', fontFamily: 'ubuntu', padding: 1
                    }}>Login</Typography>

                    <Box className="justify-around w-2/3 mt-2" display="flex" position="relative">
                        <div
                            className="slider transition-all duration-300"
                            style={{ left: isAdmin ? '60%' : '7%', width: isAdmin ? '35%' : "39%" }}
                        ></div>
                        <Button
                            className="category-button"
                            onClick={() => handleClick(false)}
                            endIcon={<GroupsIcon />}
                            sx={{ padding: '20px', width: 'auto', color: 'white' }}
                        >
                            Teacher
                        </Button>
                        <Button
                            className="category-button"
                            onClick={() => handleClick(true)}
                            endIcon={<AccountBoxIcon />}
                            sx={{ padding: '20px', width: 'auto', color: 'white' }}
                        >
                            Admin
                        </Button>
                    </Box>

                    <LoginForm func={handleChange} inputs={inputs} font="white" labels={labels} />

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