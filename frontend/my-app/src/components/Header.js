import img from '../imgtest/favicon.ico';
import { AppBar, Avatar, Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.css'
import { motion } from 'framer-motion';
import { Cookies } from 'react-cookie';
import axios from 'axios';


// TODO: add a navigate to home we dont have a way of going back to the previous page
const cookie = new Cookies();
export default function Header() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        axios.get('/logout').then(() => {
            navigate('/')
        })
        localStorage.setItem('isLoggedIn', false)
    }

    const navigatetoprofile = () => {
        navigate('/settings')
    }
    return (
        <AppBar className='header-bar ' sx={{ position: 'fixed', flexDirection: 'row', alignItems: 'center', }} elevation={0}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, zIndex: -1 }}>
                <img src={img} style={{ height: 60 }} />

                <Typography variant="h4" sx={{
                    textShadow: '1px 1px 1px rgba(255,255,255,0.9)', color: 'transparent', backgroundClip: 'text',
                    backgroundColor: '#333333', fontFamily: 'ubuntu,medium', fontWeight: 'medium', padding: 1
                }}>
                    St. Francis Institute of Technology
                </Typography>
            </Box>
            {/* <div style={{ position: 'absolute', right: 10 }}> */}
            <Stack direction="row" spacing={5} marginRight={1} zIndex={1} alignItems="center">

                {
                    (localStorage.getItem("isAdmin") == 'false') &&
                    <motion.div initial={{ borderRadius: '100%' }}
                        whileHover={{
                            scale: 1.1,
                            outline: 'solid 3px #a63446'
                        }}>

                        <Avatar onClick={navigatetoprofile} />

                    </motion.div>
                }

                <LogoutIcon onClick={logout} />

            </Stack>
            {/* </div> */}
        </AppBar >
    )
}