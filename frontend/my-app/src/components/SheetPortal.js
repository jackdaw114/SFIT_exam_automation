import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "./Header";
import { toExcel } from "./Excel";
import { Fragment, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { read, utils, write, writeFile } from "xlsx";
import { saveAs } from "file-saver";
import ExcelCard from "./ExcelCard";
import './TeacherNav.css'
import { useNavigate } from "react-router";
import * as Romanice from 'romanice';



export default function TeacherNav() {

    const [type, setType] = useState('hello')
    const [subject, setSubject] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [semester, setSemester] = useState('')
    const [department, setDepartment] = useState('')
    const [studentDetails, setStudentDetails] = useState([])
    const [year, setYear] = useState(0)
    const [jsonData, setJsonData1] = useState([])
    const [cardData, setCardData] = useState([])
    const navigate = useNavigate()
    const [subjectList, setSubjectList] = useState([])
    const handleChangeType = (e) => {
        console.log(e.target)
        setType(e.target.value)
    }
    const handleChangeSubject = (e) => {
        const selectedSubjectId = e.target.value;
        setSubject(e.target.value)
        const selectedItem = subjectList.find(item => item.subject_id === selectedSubjectId);
        if (selectedItem) {
            const selectedItemId = selectedItem._id;
            setSubjectId(selectedItemId)
            console.log(selectedItemId)
        }
    };
    // console.log(e.target.value)

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
            console.log(res.data)
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
        axios.post('/jason/create_student_marks', {
            semester: parseInt(subject.charAt(2)),
            type: type,
            subject: subject
        }, {

            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
            // TODO: teacher backend here aswell

        }).then((res) => {
            console.log(res.data)
            navigate('/viewexam', { state: { subject: subject, marks_type: type, semester: parseInt(subject.charAt(2)), } })

        })
        //console.log( jsonData)
        // console.log()
        // TODO: update function here somewhere for all (bulk update)
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
                                <InputLabel>Subject</InputLabel>
                                <Select onChange={(e) => handleChangeSubject(e)} value={subject} label="Subject" >
                                    {subjectList.map((item, index) => (

                                        <MenuItem value={item.subject_id} data-id={item._id}>{item.subject_id} - {item.subject_name}</MenuItem>

                                    ))}

                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Select Type of Marks</InputLabel>
                                {subject ? (
                                    subjectList.map((item, index) => {
                                        if (item.subject_id === subject) {
                                            return (
                                                <Select onChange={handleChangeType} value={type} label="Select Examination">

                                                    {item.practical && <MenuItem key={index} value='practical'>Practical</MenuItem>}
                                                    {item.oral && <MenuItem key={index} value='oral'>Oral</MenuItem>}
                                                    {item.term && <MenuItem key={index} value='term'>Term</MenuItem>}

                                                </Select>
                                            );
                                        }
                                        return null; // If the subject_id doesn't match, return null
                                    })
                                ) : (
                                    <Select onChange={handleChangeType} value={type} label="Select Examination">
                                        <MenuItem value=''>Please Select Subject</MenuItem>
                                    </Select>
                                )}
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
                            <ExcelCard marks_type={val.marks_type} _id={val._id} subject={val.subject.subject_name} department={val.subject.branch} teacher_name={val.teacher_name}  ></ExcelCard>
                            {/* TODO: put back this after reset db semester={val.subject.semester} */}
                        </Grid>

                    ))}
                </Grid>
            </div >
        </>
    )
}