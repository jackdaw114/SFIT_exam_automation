import { Typography, Box, Button } from '@mui/material';
import Header from './Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

export default function CreateExam() {
    return (
        <Box className='h_background' sx={{ flexGrow: 1, minHeight: '100vh'}}>
            <Header />
            
        </Box>
    )
}