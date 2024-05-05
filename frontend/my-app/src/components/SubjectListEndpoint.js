import React, { useContext, useEffect, useState } from 'react'
import { BackgroundContext } from './BackgroundContext';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import axiosInstance from './axiosInstance'

export const SubjectListEndpoint = () => {
    const { setCustomBackgroundColor } = useContext(BackgroundContext);



    const [selectedTab, setSelectedTab] = useState('UpdateSubjectList');

    const tabs = [
        { id: 'UpdateSubjectList', title: 'Update Subject List' },
        { id: 'UpdateStudentSubjects', title: 'Student Subjects' },
        { id: 'tab3', title: 'Tab 3' },
        // Add more tabs as needed
    ];

    const handleSelectTab = (tabId) => {
        setSelectedTab(tabId);
    };

    return (
        <div>
            <NavigationPane tabs={tabs} selectedTab={selectedTab} onSelectTab={handleSelectTab} />
            {/* Render content for the selected tab */}
            {selectedTab === 'UpdateSubjectList' && <UpdateSubjectList />}
            {selectedTab === 'UpdateStudentSubjects' && <UpdateStudentSubjects />}
            {selectedTab === 'tab3' && <div>Content for Tab 3</div>}
            {/* Add content for more tabs as needed */}
        </div>
    );
};

const UpdateSubjectList = () => {
    const [semester, setSemester] = useState('');
    const [branch, setBranch] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const semester_list = [1, 2, 3, 4, 5, 6, 7, 8]
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
        <>
            <Typography style={{ marginBottom: '20px' }}>
                The Subject List is a database record that stores the subject codes that belong to a certian semester making updating student records easier
                <br />
                <br />
                Please input subject codes only
                <br />
                ensure the subjects belong to the given semester and branch</Typography>
            <form>
                <label>Semester:</label>
                <select value={semester} onChange={handleSemesterChange}>
                    {semester_list.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <br />
                <label>Branch:</label>
                <input type="text" value={branch} onChange={handleBranchChange} />
                <br />
                <label>Subject List:</label>
                {subjectList.map((subject, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={subject.subject}
                            onChange={(e) => handleSubjectChange(e, index)}
                        />

                        <button type="button" onClick={() => removeSubjectField(index)}>
                            Remove
                        </button>
                    </div>

                ))}
                <button type="button" onClick={addSubjectField}>
                    Add Subject
                </button>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </>
    );
}


const UpdateStudentSubjects = () => {
    const [semester, setSemester] = useState('');
    const [branch, setBranch] = useState('');
    const [subjectList, setSubjectList] = useState([{ subject: '' }]);
    const semester_list = [1, 2, 3, 4, 5, 6, 7, 8]
    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
    };


    const handleBranchChange = (e) => {
        setBranch(e.target.value);
    };


    const handleSubjectChange = (e, index) => {
        const newSubjectList = [...subjectList];
        newSubjectList[index].subject = e.target.value;
        setSubjectList(newSubjectList);
    };


    const addSubjectField = () => {
        setSubjectList([...subjectList, { subject: '' }]);
    };


    const removeSubjectField = (index) => {
        const newSubjectList = [...subjectList];
        newSubjectList.splice(index, 1);
        setSubjectList(newSubjectList);
    };

    const handleSubmit = () => {
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
        <>
            <Typography style={{ marginBottom: '20px' }}>
                Updating Student Subjects will allocate the desired Subject List to the corresponding Students
                <br />
                <br />
                Please input subject codes only
                <br />
                ensure the subjects belong to the given semester and branch</Typography>
            <form>
                <label>Semester:</label>
                <select value={semester} onChange={handleSemesterChange}>
                    {semester_list.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <br />
                <label>Branch:</label>
                <input type="text" value={branch} onChange={handleBranchChange} />
                <br />
                <label>Subject List:</label>
                {subjectList.map((subject, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={subject.subject}
                            onChange={(e) => handleSubjectChange(e, index)}
                        />

                        <button type="button" onClick={() => removeSubjectField(index)}>
                            Remove
                        </button>
                    </div>

                ))}
                <button type="button" onClick={addSubjectField}>
                    Add Subject
                </button>
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </>
    );
}
const NavigationPane = ({ tabs, selectedTab, onSelectTab }) => {
    return (
        <Box className="navigation-pane" sx={{ margin: 2, display: 'flex' }}
        >
            {tabs.map(tab => (
                <Box
                    sx={{ padding: 1, backgroundColor: `${tab.id === selectedTab ? '#A63446' : ''}` }}
                    key={tab.id}
                    className={`tab cursor-pointer border rounded ${tab.id === selectedTab ? 'text-white' : 'text-black'}`}
                    onClick={() => onSelectTab(tab.id)}
                >
                    {tab.title}
                </Box>
            ))}
        </Box>
    );
};
