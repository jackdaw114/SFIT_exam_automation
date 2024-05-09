import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "./Header";
import { toExcel } from "./Excel";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";

import { read, utils, write, writeFile } from "xlsx";
import { saveAs } from "file-saver";
import ExcelCard from "./ExcelCard";
import './Sheets.css'
import { Routes, useNavigate } from "react-router";
import * as Romanice from 'romanice';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SheetView from "./SheetView";
import { BackgroundContext } from "./BackgroundContext";
import axiosInstance from "./axiosInstance";




export default function TeacherNav() {

    const [type, setType] = useState('')
    const [subject, setSubject] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [semester, setSemester] = useState('')
    const [department, setDepartment] = useState('')
    const [studentDetails, setStudentDetails] = useState([])
    const [year, setYear] = useState(0)
    const [jsonData, setJsonData1] = useState([])
    const [cardData, setCardData] = useState([])
    const [index, setIndex] = useState(0);
    const navigate = useNavigate()
    const [class_name, setClassName] = useState([])
    const [subjectList, setSubjectList] = useState([])
    const { setCustomBackgroundColor } = useContext(BackgroundContext)


    const open_list = []

    const handleChangeSubject = (e) => {
        open_list.push(0)
        const selectedSubjectId = e.target.value;
        setSubject(e.target.value)
        const selectedItem = subjectList.find(item => item.subject_id === selectedSubjectId);

        if (selectedItem) {
            const selectedItemId = selectedItem._id;

            console.log(subjectList.find(item => item.subject_id === subject)?.class)

            setSubjectId(selectedItemId)
            console.log(selectedItemId)
        }
    };



    useEffect(() => {
        setCustomBackgroundColor('#e7f1ef')
        axiosInstance.post('/teacher/get_exams', { teacher_id: localStorage.getItem('username') }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            console.log(res.data)
            setCardData(res.data)
        })
        axiosInstance.post('teacher/teachersubjects', { teacher_id: localStorage.getItem('username') }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            console.log(res.data.subject_list)
            // console.log(res.data)
            setSubjectList(res.data.subject_list)
        })

    }
        , [])


    const handleSubmit = async (e) => {
        //  let jsonData = []
        const theJsonData = []
        console.log(subject.charAt(3))
        axiosInstance.post('/teacher/create_student_marks', {
            semester: parseInt(subject.charAt(3)),
            marks_type: type,
            subject: subject,
            class: class_name,
            teacher_id: localStorage.getItem('username'),
            subject_id: subjectId
        }, {

            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
            // TODO: teacher backend here aswell

        }).then((res) => {
            console.log(res.data)
            navigate('/home/viewexam', { state: { subject: subject, marks_type: type, semester: parseInt(subject.charAt(3)), class: class_name, editable: res.data.editable } })

        })
        //console.log( jsonData)
        // console.log()
        // TODO: update function here somewhere for all (bulk update)
    }


    const { romanice } = Romanice;
    const standardConverter = romanice();


    return (
        <>
            <div className='container-teacher-nav w-12/12'>

                <Home open_list={open_list} subjectList={subjectList} handleChangeSubject={handleChangeSubject} type={type} setType={setType} subject={subject} setSubject={setSubject} class_name={class_name} setClassName={setClassName} handleSubmit={handleSubmit} cardData={cardData} />

            </div>
        </>
    )
}

function Home({ open_list, subjectList, handleChangeSubject, type, setType, subject, setSubject, class_name, setClassName, handleSubmit, cardData }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeType = (e) => {
        open_list.push(0)
        console.log(e.target)
        setType(e.target.value)
    }

    const handleChangeClass = (e) => {
        open_list.push(0)
        console.log(e.target)
        console.log(subjectList.find(item => item.subject_id === subject)?.class)
        setClassName(e.target.value)
    }

    return (
        <>
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
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Enter class</InputLabel>
                            {subject ? (<>
                                {console.log("MEOW", subjectList.find(item => item.subject_id === subject).class)}
                                <Select onChange={handleChangeClass} value={class_name} label="Enter Class">
                                    {[subjectList.find(item => item.subject_id === subject).class].map((item, index) => {
                                        return <MenuItem key={index} value={item} > {item} </MenuItem>
                                    })
                                    }
                                </Select>
                            </>
                            ) : (
                                <Select value={class_name} label="Enter Class">
                                    <MenuItem value='' key={10} >Please Select Subject</MenuItem>
                                </Select>
                            )}
                        </FormControl>

                    </Box>
                    <div>
                        {(type && subject && class_name.length) ?

                            <Button variant="contained" color="warning" onClick={handleClickOpen}>Open</Button>
                            :
                            <Button variant="contained" disabled="true">Open</Button>

                        }
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Instructions"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description1">
                                    1. You may make changes to the marks by either changing it directly from the portal or by uploading an excel file ONLY.
                                </DialogContentText>
                                <DialogContentText id="alert-dialog-description2">
                                    2. Do NOT upload any other type of file
                                </DialogContentText>
                                <DialogContentText id="alert-dialog-description3">
                                    3. Please ensure correct file is uploaded
                                </DialogContentText>
                                <DialogContentText id="alert-dialog-description4">
                                    4. After making changes, click on "UPDATE" button to submit changes
                                </DialogContentText>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={handleSubmit} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </div>
                </Box>
            </Box>

            <div className="pb-20 ">

                <Grid container spacing={1} className=" flex justify-center px-4">


                    {cardData.map((val, index) => (
                        <Grid item xs={12}>
                            <ExcelCard marks_type={val.marks_type} subject={[val.subject_id, val.subject_name]} semester={val.semester} department={val.branch} class={val.class} editable={val.editable} ></ExcelCard>

                        </Grid>

                    ))}


                </Grid>
            </div>



        </>
    );
}
