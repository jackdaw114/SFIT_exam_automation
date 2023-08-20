import img from '../imgtest/favicon.ico';
import { AppBar, Box, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar sx={{ position: 'relative', backgroundColor: '#292F36', justifyContent: 'center', alignItems: 'center', borderBottom: '20px solid #136F63' }} elevation={0}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    <img src={img} style={{ height: 100 }} />
                    <Typography variant="h3" sx={{
                        textShadow: '1px 1px 1px rgba(255,255,255,0.9)', color: 'transparent', backgroundClip: 'text',
                        backgroundColor: '#333333', fontFamily: 'Anton', padding: 1
                    }}>
                        St. Francis Institute of Technology
                    </Typography>
                </Box>
            </AppBar>
    )
}