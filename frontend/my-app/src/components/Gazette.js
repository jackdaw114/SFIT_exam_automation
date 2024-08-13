import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Container,
    Paper,
    Grid,
} from "@mui/material";
import { styled } from '@mui/system';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import axiosInstance from "./axiosInstance";
import { writeFile } from "xlsx";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: 16,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    minWidth: 200,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.dark,
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    borderRadius: 8,
    padding: theme.spacing(1, 4),
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
}));

export default function Gazette() {
    const [semester, setSemester] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [select, setSelect] = useState(['Year', 'Department', 'Semester']);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        setSelect(select.filter(item => item !== e.target.name));
    };

    const handleSubmit = async () => {
        try {
            const res = await axiosInstance.post('/admin/create_gazette',
                { semester, branch: department, year },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    }
                }
            );
            writeFile(res.data.book, `Gazette_semester_${semester}_department_${department}_year_${year}.xlsx`);
        } catch (error) {
            console.error("Error creating gazette:", error);
        }
    };

    return (
        <Container maxWidth="lg" className="py-8">
            <StyledPaper elevation={3}>
                <Typography variant="h4" gutterBottom className="text-center font-mont text-gray-800 mb-6">
                    Generate Gazette
                </Typography>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Year</InputLabel>
                            <StyledSelect
                                name="Year"
                                value={year}
                                label="Year"
                                onChange={handleChange(setYear)}
                            >
                                {[2022, 2023, 2024].map((y) => (
                                    <MenuItem key={y} value={y}>{y}</MenuItem>
                                ))}
                            </StyledSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Department</InputLabel>
                            <StyledSelect
                                name="Department"
                                value={department}
                                label="Department"
                                onChange={handleChange(setDepartment)}
                            >
                                {['CMPN', 'EXTC', 'MECH', 'INFT'].map((dept) => (
                                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                ))}
                            </StyledSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Semester</InputLabel>
                            <StyledSelect
                                name="Semester"
                                value={semester}
                                label="Semester"
                                onChange={handleChange(setSemester)}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                    <MenuItem key={sem} value={sem}>Sem {sem}</MenuItem>
                                ))}
                            </StyledSelect>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt={4}>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={select.length !== 0}
                        startIcon={<PdfIcon />}
                        className={`${select.length !== 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Create Gazette
                    </StyledButton>
                </Box>
            </StyledPaper>
            <Box mt={4} className="h-96 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-center">
                <Typography variant="h4" className="text-center font-mont text-gray-800">
                    {select.length ? `Please Select ${select.join(', ')}` : 'Click on "Create Gazette"'}
                </Typography>
            </Box>
        </Container>
    );
}