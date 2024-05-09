import React, { useState } from 'react';
import axios from 'axios';
import './History.css'
import { Checkbox, Input, Typography } from '@mui/material';

export default function SaveReport() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [exceptions, setExceptions] = useState([]);
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [updatedSemester, setUpdatedSemester] = useState('');
    const [clear, setClear] = useState(false)
    const handleSubmit = event => {
        event.preventDefault();

        axios.post(`/admin/save_report`, {
            start,
            end,
            exceptions,
            branch,
            semester,
            updatedSemester,
            clear
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return (
        <div className='border rounded' style={{ margin: 50, backgroundColor: 'white', padding: 10 }}>
            <Typography variant='h6' style={{ margin: '10px', marginBottom: '20px', fontFamily: 'ubuntu' }}>
                Usage: Updates the students in the database and records all current reports of the student as historic data
                <br />
                <br />
                - input Updated Semester if Student moves from one semester to the next
                <br />
                - start and end are Student PID ranges
                <br />
                - The Clear Checkbox is used to remove the current data of the student range
                <br />
                - Enter the same pid in both start and end to update only a single student

            </Typography>
            <form className='history-form' onSubmit={handleSubmit}>
                <label className='history-label'>
                    Start:
                    <Input type="number" className='history-Input' name="start" value={start} onChange={event => setStart(event.target.value)} />
                </label>
                <label className='history-label'>
                    End:
                    <Input type="number" className='history-Input' name="end" value={end} onChange={event => setEnd(event.target.value)} />
                </label>
                <label className='history-label'>
                    Exceptions:
                    <Input type="text" className='history-Input' name="exceptions" value={exceptions} onChange={event => setExceptions(event.target.value)} />
                </label>
                <label className='history-label'>
                    Branch:
                    <Input className='history-Input' type="text" name="branch" value={branch} onChange={event => setBranch(event.target.value)} />
                </label>
                <label className='history-label'>
                    Semester:
                    <Input type="text" className='history-Input' name="semester" value={semester} onChange={event => setSemester(event.target.value)} />
                </label>

                <label className='history-label'>
                    Updated Semester:
                    <Input disabled={!clear} type="text" className='history-Input' name="semester" value={updatedSemester} onChange={event => setUpdatedSemester(event.target.value)} />
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    {!clear && "\t please set clear checkbox to change semester"}
                </label>
                <label className='history-label'>
                    Clear:
                    <Checkbox className='history-Input' name="clear" value={clear} onChange={event => {
                        setClear(!clear)
                    }} />
                </label>
                <button className='history-button' type="submit">Save Report</button>
            </form>
        </div>
    )
}
