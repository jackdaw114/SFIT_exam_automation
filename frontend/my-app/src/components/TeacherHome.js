import { Box, Button, Paper, Typography } from "@mui/material";
import Header from "./Header";
import './TeacherHome.css'
import { useTheme } from "@emotion/react";

export default function TeacherHome() {
    const theme = useTheme()

    return (
        <>
            <Header />
            <Box className='button-box'>
                <Button variant="contained" sx={{ backgroundColor: '#292f36' }}>Enter Marks</Button>
            </Box >
        </>
    )
}