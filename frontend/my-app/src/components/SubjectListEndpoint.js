import React, { useContext, useEffect, useState } from 'react'
import { BackgroundContext } from './BackgroundContext';
import { Box, Button, Divider, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import axiosInstance from './axiosInstance'
import './SubjectListEndpoint.css'

import DeleteIcon from '@mui/icons-material/Delete';
export const SubjectListEndpoint = () => {
    const { setCustomBackgroundColor } = useContext(BackgroundContext);



    const [selectedTab, setSelectedTab] = useState('UpdateSubjectList');

    const tabs = [
        { id: 'UpdateSubjectList', title: 'Update Subject List' },
        { id: 'UpdateStudentSubjects', title: 'Student Subjects' },
        { id: 'AddSubject', title: 'Add Subject' },
        // Add more tabs as needed
    ];

    const handleSelectTab = (tabId) => {
        setSelectedTab(tabId);
    };

    return (
        <div>
            <NavigationPane tabs={tabs} selectedTab={selectedTab} onSelectTab={handleSelectTab} />
            <Divider />
            {/* Render content for the selected tab */}
            {selectedTab === 'UpdateSubjectList' && <UpdateSubjectList />}
            {selectedTab === 'UpdateStudentSubjects' && <UpdateStudentSubjects />}
            {selectedTab === 'AddSubject' && <AddSubject />
            }            {/* Add content for more tabs as needed */}
        </div>
    );
};

const UpdateSubjectList = () => {
    const [semester, setSemester] = useState('');
    const [branch, setBranch] = useState('');
    const [subjectList, setSubjectList] = useState(['']);
    const semester_list = [1, 2, 3, 4, 5, 6, 7, 8]
    const branch_list = ["CMPN", "EXTC", "INFT", "MECH"]
    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
    };


    const handleBranchChange = (e) => {
        setBranch(e.target.value);
    };


    const handleSubjectChange = (e, index) => {
        const newSubjectList = [...subjectList];
        newSubjectList[index] = e.target.value;
        setSubjectList(newSubjectList);
    };


    const addSubjectField = () => {
        setSubjectList([...subjectList, '']);
    };


    const removeSubjectField = (index) => {
        const newSubjectList = [...subjectList];
        newSubjectList.splice(index, 1);
        setSubjectList(newSubjectList);
    };

    const handleSubmit = () => {
        console.log(subjectList)
        axiosInstance.post('/admin/update_subject_list', {
            branch: branch,
            semester: semester,
            subject_ids: subjectList
        }).then(res => {
            console.log(res)
            alert('updated subject list successfull')
        })
    }
    return (
        <div style={{ margin: '3rem', marginTop: '2rem' }}>
            <Typography variant='h6' style={{ marginBottom: '20px', fontFamily: 'ubuntu' }}>
                The Subject List is a database record that stores the subject codes that belong to a certain semester making updating student records easier
                <br />
                <br />
                - Please input subject codes only
                <br />
                - ensure the subjects belong to the given semester and branch</Typography>
            <form>
                <label>Semester:</label>

                <Select variant='standard' sx={{
                    '& .MuiSelect-select': {
                        paddingLeft: 1,

                    },
                }} value={semester} className='custom-select' color='secondary' onChange={handleSemesterChange}>
                    {semester_list.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                <Divider variant='middle' sx={{ paddingTop: 2, marginBottom: 1 }} />
                <label>Branch:</label>

                <Select variant='standard' sx={{
                    '& .MuiSelect-select': {
                        paddingLeft: 1,
                    },
                }} value={branch} className='custom-select-branch' color='secondary' onChange={handleBranchChange}>
                    {branch_list.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>

                <Divider variant='middle' sx={{ paddingTop: 2, marginBottom: 1 }} />
                <label>Subject List:</label>
                {
                    subjectList.map((subject, index) => (
                        <div key={index}>
                            <TextField
                                variant='standard'
                                sx={{ padding: 1 }}
                                type="text"
                                value={subject.subject}
                                onChange={(e) => handleSubjectChange(e, index)}
                            />

                            <IconButton type="button" onClick={() => removeSubjectField(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>

                    ))
                }
                <Button variant='contained' sx={{ backgroundColor: '#F97068' }} onClick={addSubjectField}>
                    Add Subject
                </Button>
                <Button variant='contained' sx={{ margin: 1, marginLeft: 3, backgroundColor: ' #136F63' }} onClick={handleSubmit}>
                    Submit
                </Button>
            </form >
        </div >
    );
}


const UpdateStudentSubjects = () => {
    const [semester, setSemester] = useState('');
    const [branch, setBranch] = useState('');
    const semester_list = [1, 2, 3, 4, 5, 6, 7, 8]
    const branch_list = ["CMPN", "EXTC", "INFT", "MECH"]
    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
    };


    const handleBranchChange = (e) => {
        setBranch(e.target.value);
    };






    const handleSubmit = () => {
        axiosInstance.post('/admin/set_subject_list', {
            branch: branch,
            semester: semester,
        }).then(res => {
            console.log(res)
            alert('updated subject list successfull')
        })
    }
    return (
        <div style={{ margin: '3rem', marginTop: '2rem' }}>
            <Typography variant='h6' style={{ marginBottom: '20px', fontFamily: 'ubuntu' }}>
                Automatically updates all subjects of students in a batch
                <br />
                <br />
                - please select the branch and semester to be updated
            </Typography>
            <form>
                <label>Semester:</label>

                <Select variant='standard' sx={{
                    '& .MuiSelect-select': {
                        paddingLeft: 1,

                    },
                }} value={semester} className='custom-select' color='secondary' onChange={handleSemesterChange}>
                    {semester_list.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                <Divider variant='middle' sx={{ paddingTop: 2, marginBottom: 1 }} />
                <label>Branch:</label>

                <Select variant='standard' sx={{
                    '& .MuiSelect-select': {
                        paddingLeft: 1,
                    },
                }} value={branch} className='custom-select-branch' color='secondary' onChange={handleBranchChange}>
                    {branch_list.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                <br />
                <Button variant='contained' sx={{ marginTop: 4, backgroundColor: ' #136F63' }} onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
        </div >
    );
}

const AddSubject = () => {
    const [subjectCode, setSubjectCode] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [branch, setBranch] = useState('')
    const branch_list = ["CMPN", "EXTC", "INFT", "MECH"]
    const handleSubjectCodeChange = (e) => {
        setSubjectCode(e.target.value)
    }
    const handleSubjectNameChange = (e) => {
        setSubjectName(e.target.value)
    }
    const handleBranchChange = (e) => {
        setBranch(e.target.value)
    }
    const handleSubmit = (e) => {
        axiosInstance.post('/admin/add_subject', {
            subject_id: subjectCode,
            subject_name: subjectName,
            branch: branch
        }).then(res => {
            console.log(res)
            alert('updated subject list successfull')
        })
    }
    return (
        <div style={{ margin: '3rem', marginTop: '2rem' }}>
            <Typography variant='h6' style={{ marginBottom: '20px', fontFamily: 'ubuntu' }}>
                Updates the Subjects in the database
                <br />
                <br />
                - For adding or changing subjects and their names
            </Typography>
            <label>Enter Subject Code:</label>
            <TextField
                variant='standard'
                sx={{ paddingLeft: 2.5 }}
                type="text"
                value={subjectCode}
                onChange={handleSubjectCodeChange}
            />

            <Divider variant='middle' sx={{ paddingTop: 2, marginBottom: 2 }} />
            <label>Enter Subject Name:</label>
            <TextField
                variant='standard'
                sx={{ paddingLeft: 2 }}
                type="text"
                value={subjectName}
                onChange={handleSubjectNameChange}
            />

            <Divider variant='middle' sx={{ paddingTop: 2, marginBottom: 2 }} />
            <label>Select Branch:</label>
            <Select variant='standard' sx={{
                '& .MuiSelect-select': {
                    paddingLeft: 1,
                },
            }} value={branch} className='custom-select-branch' color='secondary' onChange={handleBranchChange}>
                {branch_list.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
            <br />
            <Button variant='contained' sx={{ marginTop: 4, backgroundColor: ' #136F63' }} onClick={handleSubmit}>
                Submit
            </Button>

        </div>
    )
}
const NavigationPane = ({ tabs, selectedTab, onSelectTab }) => {
    return (
        <Box className="navigation-pane" sx={{ padding: 3, paddingLeft: 9, paddingBottom: 0, display: 'flex', boxShadow: 'inset 0px -4px 3px -1px rgba(0,0,0,0.2)' }}
        >
            {tabs.map(tab => (
                <Box
                    sx={{ padding: 1, backgroundColor: `${tab.id === selectedTab ? '#A63446' : ''}` }}
                    key={tab.id}
                    className={`tab cursor-pointer ${tab.id === selectedTab ? 'text-white shadow-custom' : 'text-black'}`}
                    onClick={() => onSelectTab(tab.id)}
                >
                    {tab.title}
                </Box>
            ))}
        </Box>
    );
};
