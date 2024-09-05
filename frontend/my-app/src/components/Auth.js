import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';

import { useNavigate } from 'react-router';
import LoginForm from './LoginForm';
import axios from 'axios';
import './Auth.css';
import { BackgroundContext } from './BackgroundContext';

const Auth = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const { setCustomBackgroundColor } = useContext(BackgroundContext);

    useEffect(() => {
        setCustomBackgroundColor('#e7f1ef');
    }, [setCustomBackgroundColor]);

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            if (localStorage.getItem('isAdmin') === 'true') {
                console.log("Admin already logged in!");
            }
        } else {
            console.log("not logged in! : ", localStorage.getItem('isLoggedIn'));
        }
    }, []);

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const handleClick = (isAdmin) => {
        setIsAdmin(isAdmin);
    };

    const labels = {
        username: "username",
        password: "password"
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        let url = '';
        if (isAdmin) {
            url = '/admin/login';
        } else {
            url = '/teacher/login';
        }
        axios.post(url, inputs, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('isLoggedIn', true);
            if (isAdmin) {
                localStorage.setItem('isAdmin', true);
                navigate('/adminhome');
            } else {
                localStorage.setItem('isAdmin', false);
                localStorage.setItem('phoneNo', res.data.phoneNo);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('password', res.data.password);
                navigate('/home');
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                alert(error.response.data);
            } else {
                alert(error);
            }
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    className="bg-primary transition-all duration-300 shadow-md hover:shadow-2xl"
                    display="flex"
                    flexDirection="column"
                    maxWidth={500}
                    alignItems="center"
                    justifyContent="center"
                    margin="auto"
                    marginTop={20}
                    padding={3}
                    borderRadius={4}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            textShadow: '1px 1px 1px rgba(255,255,255,0.9)',
                            color: 'transparent',
                            backgroundClip: 'text',
                            backgroundColor: '#333333',
                            fontFamily: 'ubuntu',
                            padding: 1
                        }}
                    >
                        Login
                    </Typography>

                    <Box className="justify-around w-2/3 my-3" display="flex" position="relative">
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
                    >
                        Login
                    </Button>

                </Box>
            </form>
            <Box textAlign="center" marginTop={30}>
                <Typography variant="body2" sx={{ color: 'gray', fontSize: 'small' }}>
                    Nigel Colaco, Aakhaash Diclas, Evan Mendonsa, Jason Sampy
                </Typography>
            </Box>
        </div>
    );
}

export default Auth;
