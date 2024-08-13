import React, { useState } from 'react';
import { Box, Button, Typography, Container, Paper, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from './axiosInstance';
import LoginForm from './LoginForm';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 16,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    borderRadius: 8,
    padding: theme.spacing(1, 4),
}));

export default function DeleteTeacher() {
    const [input, setInput] = useState({ username: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({ ...prevInput, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post('/admin/deleteteacher', input, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response.status === 200) {
                setSnackbarMessage('Teacher deleted from database successfully!');
                setInput({ username: '' });
            } else if (response.status === 500) {
                setSnackbarMessage('Duplicate record found. Please enter a unique username.');
            } else {
                setSnackbarMessage('Record not found.');
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
            setSnackbarMessage('An error occurred. Please try again.');
        }

        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Box mt={10}>
                <StyledPaper elevation={3}>
                    <Typography variant="h4" gutterBottom fontFamily="Ubuntu">
                        Delete Teacher
                    </Typography>
                    <LoginForm
                        inputs={input}
                        func={handleChange}
                        labels={{ username: 'Username' }}
                        font="inherit"
                    />
                    <StyledButton
                        variant="contained"
                        color="error"
                        onClick={handleSubmit}
                        fullWidth
                        startIcon={<DeleteIcon />}
                    >
                        Delete Teacher
                    </StyledButton>
                </StyledPaper>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Container>
    );
}