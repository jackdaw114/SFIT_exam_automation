import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Button, ClickAwayListener } from '@mui/material';
import { useNavigate } from 'react-router';
import "./TeacherProfile.css";
import UpdateName from './ProfileComponents/UpdateName';
import UpdateEmail from './ProfileComponents/UpdateEmail';
import UpdateNumber from './ProfileComponents/UpdateNumber';
import ChangePass from './ProfileComponents/ChangePass';
import axios from 'axios';


const font = 'ubuntu,medium'
const font_size = 19
const ProfilePaper = (props) => (
    <Paper {...props} style={{ margin: 'auto', maxWidth: 600, marginTop: 4, padding: "60px", backgroundColor: "#fcf3dc" }} />
);

const AvatarWrapper = (props) => (
    <div {...props} style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }} />
);

const UserInfo = (props) => (
    <div {...props}
        style={{ marginTop: 40 }}
    />
);

function TeacherProfile() {
    // const location = useLocation();
    // const prevLocation = usePrevLocation(location)
    // localStorage.setItem('prevLocation',prevLocation)

    // Sample User data
    const user = {
        // username: localStorage.getItem('username'),
        // phoneNumber: localStorage.getItem('phoneNo'),
        // email: localStorage.getItem('email')
        username: localStorage.getItem("username"),
        phoneNumber: localStorage.getItem("phoneNo"),
        email: localStorage.getItem("email")
    };
    
    useEffect(()=>{
        // axios.get('/teacher/getemail',{username: user.username}).then((res) => {
        //     console.log("This is res.data: ", res.data)
        //     user.email = res.data
        // })
    },[user.email])

    // const [display,setDisplay] = useState(true)
    const navigate = useNavigate();
    const handleClickAway = () => {
        navigate('/')
    }
    const [choice, setChoice] = useState(-1)
    const renderChoice = () => {
        console.log(choice)
        switch (choice) {
            case 0:
                return (<UpdateName />);
            case 1:
                return (<UpdateNumber />);
            case 2:
                return (<UpdateEmail />);
            case 3:
                return (<ChangePass />);
            default: return (<></>)
        }
    }

    return (
        <Box className='prof-super-box'>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box minWidth={800}
                    marginTop={"5vh"}
                // alignItems={"center"}
                >

                    <ProfilePaper className='prof-paper'>
                        <AvatarWrapper>
                            <Avatar alt={user.username} style={{ width: 150, height: 150, margin: 20 }} />
                        </AvatarWrapper>
                        <UserInfo>
                            <Grid container spacing={1} alignItems="center" margin={1}>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle1" fontFamily={font} fontSize={font_size}>Username:</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant="body1" fontFamily={font} fontSize={font_size}>{user.username}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant='contained' onClick={() => setChoice(0)}>
                                        <Typography variant="body1" fontFamily={font} fontSize={font_size}>Update</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="center" margin={1}>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle1" fontFamily={font} fontSize={font_size}>Phone Number:</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant="body1" fontFamily={font} fontSize={font_size}>{user.phoneNumber}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant='contained' onClick={() => setChoice(1)}>
                                        <Typography variant="body1" fontFamily={font} fontSize={font_size}>Update</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="center" margin={1}>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle1" fontFamily={font} fontSize={font_size}>Email:</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant="body1" fontFamily={font} fontSize={font_size}>{user.email}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant='contained' onClick={() => setChoice(2)}>
                                        <Typography variant="body1" fontFamily={font} fontSize={font_size}>Update</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Box marginTop={4} display={"flex"} justifyContent={"center"}>
                                <Button variant='contained' color='warning' onClick={() => setChoice(3)}>
                                    <Typography variant="body1" fontFamily={font} fontSize={font_size}>Change Password</Typography>
                                </Button>
                            </Box>
                        </UserInfo>
                        <Box>
                            {renderChoice()}
                        </Box>
                    </ProfilePaper>
                </Box>
            </ClickAwayListener>

        </Box>
    );
}

export default TeacherProfile;