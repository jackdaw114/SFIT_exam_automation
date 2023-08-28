import img from '../imgtest/favicon.ico';
import { AppBar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/login')
        localStorage.setItem('isLoggedIn', false)
    }
    return (
        <AppBar sx={{ display: 'flex', flexDirection: 'row', position: 'relative', alignItems: 'center', backgroundColor: '#292F36', borderBottom: '20px solid #136F63' }} elevation={0}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                <img src={img} style={{ height: 100 }} />

                <Typography variant="h3" sx={{
                    textShadow: '1px 1px 1px rgba(255,255,255,0.9)', color: 'transparent', backgroundClip: 'text',
                    backgroundColor: '#333333', fontFamily: 'Anton', padding: 1
                }}>
                    St. Francis Institute of Technology
                </Typography>
            </Box>
            <div style={{ paddingRight: 10, justifySelf: 'center' }}>
                <LogoutIcon onClick={logout} />
            </div>
        </AppBar >
    )
}