import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "./Header";
import { toExcel } from "./Excel";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { read, utils, write, writeFile } from "xlsx";
import { saveAs } from "file-saver";
import ExcelCard from "./ExcelCard";
import './TeacherNav.css'
import { useNavigate } from "react-router";
import * as Romanice from 'romanice';



export default function TeacherNav() {

    const [type, setType] = useState('')
    const [subject, setSubject] = useState('')
    const [semester, setSemester] = useState('')
    const [department, setDepartment] = useState('')
    const [studentDetails, setStudentDetails] = useState([])
    const [year, setYear] = useState(0)
    const [jsonData, setJsonData1] = useState([])
    const [cardData, setCardData] = useState([])
    const navigate = useNavigate()
    const [subjectList, setSubjectList] = useState([])
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
        axios.post('teacher/teachersubjects', { teacher_id: localStorage.getItem('username') }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            console.log(res.data.subject_list)
            console.log(res.data)
            setSubjectList(res.data.subject_list)
        })

    }
        , [])


    const handleSubmit = async (e) => {
        //  let jsonData = []
        const theJsonData = []
        axios.get('/teacher/getstudents').then((res) => {
            res.data.map((value, index) => {
                const { _id, ...filtered } = value
                console.log(filtered)
                theJsonData.push({ pid: value.pid, name: value.name, marks: -8 })
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
                navigate('/viewexam', { state: { _id: res.data._id } })
            })
        })
        //console.log( jsonData)
        // console.log()

    }

    // useEffect(() => {
    //     console.log(jsonData)
    // }, [jsonData])

    // Arabic Numerals to Roman - Library
    const { romanice } = Romanice;
    const standardConverter = romanice();
    return (
        <>
            <div className='container-teacher-nav'>

                <Box className='selection-box'>
                    <Box sx={{ borderRadius: 2, margin: 2, backgroundColor: "white", display: 'flex', justifyContent: 'space-around', boxSizing: "100%", padding: 5, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', minWidth: '85%' }} className=" justify-evenly">
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Select Examination</InputLabel>
                                <Select onChange={handleChangeType} value={type} label="Select Examination" >
                                    <MenuItem value="oral/practical">Oral/Practical</MenuItem>
                                    {/* <MenuItem value="practical">Practical</MenuItem> */}
                                    <MenuItem value="theory">Theory</MenuItem>
                                    <MenuItem value="term-work">Term Work</MenuItem>
                                    <MenuItem value="iat">IAT</MenuItem>
                                </Select>
                            </FormControl>


                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Year</InputLabel>
                                <Select onChange={handleChangeYear} value={year} label="Year">
                                    <MenuItem value="2022">2022</MenuItem>
                                    <MenuItem value="2023">2023</MenuItem>
                                    <MenuItem value="2024">2024</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Department</InputLabel>
                                <Select onChange={handleChangeDepartment} value={department} label="Department" >
                                    <MenuItem value="CMPN">CMPN</MenuItem>
                                    <MenuItem value="EXTC">EXTC</MenuItem>
                                    <MenuItem value="MECH">MECH</MenuItem>
                                    <MenuItem value="INFT">INFT</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Semester</InputLabel>
                                <Select onChange={handleChangeSemester} value={semester} label="Semester" >
                                    <MenuItem value={1}>Sem {standardConverter.toRoman(1)}</MenuItem>
                                    <MenuItem value={2}>Sem {standardConverter.toRoman(2)}</MenuItem>
                                    <MenuItem value={3}>Sem {standardConverter.toRoman(3)}</MenuItem>
                                    <MenuItem value={4}>Sem {standardConverter.toRoman(4)}</MenuItem>
                                    <MenuItem value={5}>Sem {standardConverter.toRoman(5)}</MenuItem>
                                    <MenuItem value={6}>Sem {standardConverter.toRoman(6)}</MenuItem>
                                    <MenuItem value={7}>Sem {standardConverter.toRoman(7)}</MenuItem>
                                    <MenuItem value={8}>Sem {standardConverter.toRoman(8)}</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Subject</InputLabel>
                                <Select onChange={handleChangeSubject} value={subject} label="Subject" >
                                    {subjectList.map((item, index) => (

                                        <MenuItem value={item.subject_id}>{item.subject_id} - {item.subject_name}</MenuItem>

                                    ))}

                                </Select>
                            </FormControl>
                        </Box>
                        <div>

                            <Button variant="contained" color="warning" onClick={handleSubmit}>Open</Button>
                        </div>
                    </Box>
                </Box>
                <Grid container spacing={1} sx={{ padding: 2 }}>
                    {cardData.map((val, index) => (
                        <Grid item xs={12}>
                            <ExcelCard marks_type={val.marks_type} _id={val._id} subject={val.subject} semester={val.semester} department={val.department} teacher_name={val.teacher_name}  ></ExcelCard>
                        </Grid>

                    ))}
                </Grid>
            </div>
        </>
    )
}