import React, { useContext, useEffect, useState, useMemo } from "react";
import axiosInstance from "./axiosInstance";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExcelCard from "./ExcelCard";
import { BackgroundContext } from "./BackgroundContext";
import LoadingScreen from "./LoadingScreen";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // Cache duration of 24 hours

export default function TeacherNav() {
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [type, setType] = useState('');
    const [class_name, setClassName] = useState('');
    const [cardData, setCardData] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { setCustomBackgroundColor } = useContext(BackgroundContext);

    useEffect(() => {
        setCustomBackgroundColor('#e7f1ef');
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        const examsCache = JSON.parse(localStorage.getItem('cachedExams'));
        const subjectsCache = JSON.parse(localStorage.getItem('cachedSubjects'));
        const lastFetchTime = parseInt(localStorage.getItem('examsLastFetchTime'), 10);
        const currentTime = Date.now();

        // Check if cache is still valid
        if (examsCache && subjectsCache && (currentTime - lastFetchTime < CACHE_DURATION)) {
            setCardData(examsCache);
            setSubjectList(subjectsCache);
            setIsLoading(false);
        } else {
            setIsLoading(true);
            await Promise.all([fetchExams(), fetchSubjects()]);
            setIsLoading(false);
        }
    };

    const fetchExams = async () => {
        try {
            const res = await axiosInstance.post('/teacher/get_exams', { teacher_id: localStorage.getItem('username') });
            setCardData(res.data);
            localStorage.setItem('cachedExams', JSON.stringify(res.data));
            const currentTime = Date.now();
            localStorage.setItem('examsLastFetchTime', currentTime.toString());
        } catch (error) {
            console.error("Error fetching exams:", error);
        }
    };

    const fetchSubjects = async () => {
        try {
            const res = await axiosInstance.post('teacher/teachersubjects', { teacher_id: localStorage.getItem('username') });
            setSubjectList(res.data.subject_list);
            localStorage.setItem('cachedSubjects', JSON.stringify(res.data.subject_list));
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const handleChangeSubject = (e) => {
        const selectedSubjectId = e.target.value;
        setSubject(selectedSubjectId);
        const selectedItem = subjectList.find(item => item.subject_id === selectedSubjectId);
        if (selectedItem) {
            setSubjectId(selectedItem._id);
        }
        // Reset type and class when subject changes
        setType('');
        setClassName('');
    };

    const handleSubmit = async () => {
        try {
            const res = await axiosInstance.post('/teacher/create_student_marks', {
                semester: parseInt(subject.charAt(3)),
                marks_type: type,
                subject: subject,
                class: class_name,
                teacher_id: localStorage.getItem('username'),
                subject_id: subjectId
            });

            if (res.data) {
                const newCard = {
                    marks_type: type,
                    subject_id: subject,
                    subject_name: subjectList.find(item => item.subject_id === subject)?.subject_name,
                    semester: parseInt(subject.charAt(3)),
                    branch: class_name.split('-')[0],
                    class: class_name,
                    editable: res.data.editable
                };

                // Update cardData state and localStorage cache
                setCardData(prevData => {
                    const updatedData = [...prevData, newCard];
                    localStorage.setItem('cachedExams', JSON.stringify(updatedData));
                    return updatedData;
                });

                // Update last fetch time
                const currentTime = Date.now();
                localStorage.setItem('examsLastFetchTime', currentTime.toString());
            }

            navigate('/home/viewexam', { state: { subject: subject, marks_type: type, semester: parseInt(subject.charAt(3)), class: class_name, editable: res.data.editable } });
        } catch (error) {
            console.error("Error creating student marks:", error);
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <div className='container-teacher-nav w-12/12'>
            <Home
                subjectList={subjectList}
                handleChangeSubject={handleChangeSubject}
                type={type}
                setType={setType}
                subject={subject}
                class_name={class_name}
                setClassName={setClassName}
                handleSubmit={handleSubmit}
                cardData={cardData}
            />
        </div>
    );
}

function Home({ subjectList, handleChangeSubject, type, setType, subject, class_name, setClassName, handleSubmit, cardData }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeType = (e) => setType(e.target.value);
    const handleChangeClass = (e) => setClassName(e.target.value);
    const handleSubjectChange = (e) => {
        handleChangeSubject(e);
        setType('');
        setClassName('');
    };

    // Filter cardData based on the selected subject, marks type, and class
    const filteredCardData = useMemo(() => {
        return cardData.filter(card =>
            (!subject || card.subject_id === subject) &&
            (!type || card.marks_type === type) &&
            (!class_name || card.class === class_name)
        );
    }, [cardData, subject, type, class_name]);

    return (
        <>

            <Box className='selection-box'>
                <Box sx={{ borderRadius: 2, margin: 2, backgroundColor: "white", display: 'flex', justifyContent: 'space-around', boxSizing: "100%", padding: 5, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', minWidth: '85%' }} className="justify-evenly">
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Subject</InputLabel>
                            <Select onChange={handleSubjectChange} value={subject} label="Subject">
                                <MenuItem value="">All Subjects</MenuItem>
                                {subjectList.map((item) => (
                                    <MenuItem key={item._id} value={item.subject_id}>{item.subject_id} - {item.subject_name}</MenuItem>
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

            <Box>
                <h1 className='font-bold text-xl m-5'>Your Exams</h1>
                <Grid container spacing={1} style={{ padding: 12 }}>
                    {filteredCardData.map(card => (
                        <Grid key={`${card.subject_id}-${card.marks_type}-${card.class}`} item xs={12}>
                            <ExcelCard
                                marks_type={card.marks_type}
                                subject={[card.subject_id, card.subject_name]}
                                semester={card.semester}
                                department={card.branch}
                                class={card.class}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

        </>
    );
}
