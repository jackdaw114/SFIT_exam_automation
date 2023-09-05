import img from '../imgtest/favicon.ico';
import { AppBar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.css'

export default function Header() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/login')
        localStorage.setItem('isLoggedIn', false)
    }
    return (
        <AppBar className='header-bar' sx={{ position: 'relative', flexDirection: 'row', alignItems: 'center', backgroundColor: '#292F36' }} elevation={0}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                <img src={img} style={{ height: 60 }} />

                <Typography variant="h4" sx={{
                    textShadow: '1px 1px 1px rgba(255,255,255,0.9)', color: 'transparent', backgroundClip: 'text',
                    backgroundColor: '#333333', fontFamily: 'ubuntu,medium', fontWeight: 'medium', padding: 1
                }}>
                    St. Francis Institute of Technology
                </Typography>
            </Box>
            <div style={{ position: 'absolute', right: 10 }}>
                <LogoutIcon onClick={logout} />
            </div>
        </AppBar >
    )
}