import React, { useState } from 'react';
import {
    Box, Button, Typography, Container, Paper, Snackbar,
    TextField, Tab, Tabs, ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from './axiosInstance';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#292F36',
        },
        secondary: {
            main: '#136F63',
        },
        background: {
            default: '#27272a', // bg-zinc-800
            paper: '#3f3f46', // bg-zinc-700
        },
    },
    typography: {
        fontFamily: '"Montserrat", "Open Sans", "Anta", "Advent Pro", sans-serif',
    },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 16,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    backgroundColor: theme.palette.background.paper,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    borderRadius: 8,
    padding: theme.spacing(1, 4),
    fontFamily: '"Montserrat", sans-serif',
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    width: '100%',
    '& .MuiInput-underline:before': {
        borderBottomColor: "white",
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: "white",
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: "white",
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
        fontFamily: '"Montserrat", sans-serif',
        '&.Mui-focused': {
            color: theme.palette.secondary.main,
        },
    },
    '& .MuiInput-input': {
        color: theme.palette.text.primary,
        fontFamily: '"Montserrat", sans-serif',
        '&::placeholder': {
            color: theme.palette.text.secondary,
            opacity: 0.7,
        },
    },
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
        '& .MuiInput-underline:before': {
            borderBottomColor: theme.palette.secondary.light,
        },
    },
}));

export default function ManageTeacher() {
    const [tab, setTab] = useState(0);
    const [inputs, setInputs] = useState({ username: '', password: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const endpoint = tab === 0 ? '/admin/addteacher' : '/admin/deleteteacher';
            const response = await axiosInstance.post(endpoint, inputs, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response.status === 200) {
                setSnackbarMessage(tab === 0 ? 'Teacher added successfully!' : 'Teacher deleted successfully!');
                setInputs({ username: '', password: '' });
            } else if (response.status === 201) {
                setSnackbarMessage(response.data);
            } else {
                setSnackbarMessage("An unexpected error occured.")
            }
        } catch (error) {

            console.error('Error managing teacher:', error);
            setSnackbarMessage('An error occurred. Please try again.');
        }

        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm" className="bg-zinc-800 px-10 mt-20 py-10 rounded-3xl">
                <StyledPaper elevation={3}>
                    <Tabs
                        value={tab}
                        onChange={(e, newValue) => setTab(newValue)}
                        centered
                        textColor="white"
                        indicatorColor="secondary"
                    >
                        <Tab label="Add Teacher" className="font-mont" />
                        <Tab label="Delete Teacher" className="font-mont" />
                    </Tabs>
                    <Box mt={4} width="100%">
                        <Typography variant="h4" gutterBottom className="font-mont text-center text-white">
                            {tab === 0 ? 'Add New Teacher' : 'Delete Teacher'}
                        </Typography>
                        <ModernTextField
                            label="Username"
                            name="username"
                            value={inputs.username}
                            onChange={handleChange}
                            variant="standard"
                            placeholder="Enter username"
                        />
                        {tab === 0 && (
                            <ModernTextField
                                label="Password"
                                name="password"
                                type="password"
                                value={inputs.password}
                                onChange={handleChange}
                                variant="standard"
                                placeholder="Enter password"
                            />
                        )}
                        <StyledButton
                            variant="contained"
                            color={tab === 0 ? 'primary' : 'error'}
                            onClick={handleSubmit}
                            fullWidth
                            startIcon={tab === 0 ? <AddIcon /> : <DeleteIcon />}
                            className="font-mont"
                        >
                            {tab === 0 ? 'Add Teacher' : 'Delete Teacher'}
                        </StyledButton>
                    </Box>
                </StyledPaper>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                />
            </Container>
        </ThemeProvider>
    );
}