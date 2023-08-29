import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "./Header";
import { toExcel } from "./Excel";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { read, utils, write, writeFile } from "xlsx";
import { saveAs } from "file-saver";
import ExcelCard from "./ExcelCard";





export default function TeacherNav() {

    const [type, setType] = useState('')
    const [subject, setSubject] = useState('')
    const [semester, setSemester] = useState('')
    const [department, setDepartment] = useState('')
    const [studentDetails, setStudentDetails] = useState([])
    const [year, setYear] = useState(0)
    const [jsonData, setJsonData1] = useState([])
    const [cardData, setCardData] = useState([])
    const handleChangeType = (e) => {
        setType(e.target.value)
        // console.log(e.target.value)
    }
    const handleChangeSubject = (e) => {
        setSubject(e.target.value)
        // console.log(e.target.value)
    }
    const handleChangeSemester = (e) => {
        setSemester(e.target.value)
        // console.log(e.target.value)
    }
    const handleChangeDepartment = (e) => {
        setDepartment(e.target.value)
        // console.log(e.target.value)
    }
    const handleChangeYear = (e) => {
        setYear(e.target.value)
        // console.log(e.target.value)
    }
    
    useEffect(() => {
        axios.post('/teacher/fetchexcel', { teacher_name: localStorage.getItem('username') }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            setCardData(res.data)
        })
    }, [])
    
    const handleSubmit = async (e) => {
        //  let jsonData = []
        const theJsonData = []
        axios.get('/teacher/getstudents').then((res) => {
            res.data.map((value, index) => {
                const { _id, ...filtered } = value
                theJsonData.push({ ...filtered , marks:-8 })
            })
            console.log(theJsonData)
            // console.log("This is Json  \n",jsonData)
            // console.log("This is student details: \n",studentDetails)
        
            axios.post('/teacher/uploadexcel', {
                marks_type: type,
                teacher_name: localStorage.getItem('username'),
                sheet: toExcel(theJsonData),
                subject: subject,
                semester: semester,
                department: department,
                year: year,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            }).then((res) => {
                console.log(res.data)
                const workbook = read(res.data, { type: 'binary' })
                console.log(workbook)
            })
        })
        //console.log( jsonData)
        // console.log()
       
    }

    useEffect(()=>{
        console.log(jsonData)
    },[jsonData])
    return (
        <>
            <Header />
            <Box sx={{ padding: 2, }}>
                <Box sx={{ borderRadius: 3, backgroundColor: "white", border: 0.75, display: 'flex', justifyContent: 'space-around', boxSizing: "100%", padding: 5, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', minWidth: '70%' }}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Select Examination</InputLabel>
                            <Select onChange={handleChangeType} value={type} label="Select Examination" autoWidth>
                                <MenuItem value="oral">Oral</MenuItem>
                                <MenuItem value="practical">Practical</MenuItem>
                                <MenuItem value="theory">Theory</MenuItem>
                                <MenuItem value="term-work">Term Work</MenuItem>
                                <MenuItem value="iat">IAT</MenuItem>
                            </Select>
                        </FormControl>


                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Year</InputLabel>
                            <Select onChange={handleChangeYear} value={year} label="Year" autoWidth>
                                <MenuItem value="2022">2022</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Department</InputLabel>
                            <Select onChange={handleChangeDepartment} value={department} label="Department" autoWidth>
                                <MenuItem value="CMPN">CMPN</MenuItem>
                                <MenuItem value="EXTC">EXTC</MenuItem>
                                <MenuItem value="MECH">MECH</MenuItem>
                                <MenuItem value="INFT">INFT</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Semester</InputLabel>
                            <Select onChange={handleChangeSemester} value={semester} label="Semester" autoWidth>
                                <MenuItem value={1}>Sem 1</MenuItem>
                                <MenuItem value={2}>Sem 2</MenuItem>
                                <MenuItem value={3}>Sem 3</MenuItem>
                                <MenuItem value={4}>Sem 4</MenuItem>
                                <MenuItem value={5}>Sem 5</MenuItem>
                                <MenuItem value={6}>Sem 6</MenuItem>
                                <MenuItem value={7}>Sem 7</MenuItem>
                                <MenuItem value={8}>Sem 8</MenuItem>

                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Subject</InputLabel>
                            <Select onChange={handleChangeSubject} value={subject} label="Subject" autoWidth>
                                <MenuItem value="sub1">Subject 1</MenuItem>
                                <MenuItem value="sub2">Subject 2</MenuItem>
                                <MenuItem value="sub3">Subject 3</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    <div>

                        <Button variant="contained" color="warning" onClick={handleSubmit}>Generate Template</Button>
                    </div>
                </Box>
            </Box>
            <Grid container spacing={5} sx={{ padding: 2 }}>
                {cardData.map((val, index) => (
                    <Grid item xs={3}>
                        <ExcelCard marks_type={val.marks_type} _id={val._id} subject={val.subject} semester={val.semester} department={val.department} teacher_name={val.teacher_name}  ></ExcelCard>
                    </Grid>

                ))}
            </Grid>
        </>
    )
}