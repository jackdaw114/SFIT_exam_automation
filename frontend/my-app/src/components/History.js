import React, { useState } from 'react';
import axios from 'axios';

export default function SaveReport() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [exceptions, setExceptions] = useState([]);
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [clear, setClear] = useState(false)
    const handleSubmit = event => {
        event.preventDefault();

        axios.post(`/admin/save_report`, {
            start,
            end,
            exceptions,
            branch,
            semester
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Start:
                    <input type="number" name="start" value={start} onChange={event => setStart(event.target.value)} />
                </label>
                <label>
                    End:
                    <input type="number" name="end" value={end} onChange={event => setEnd(event.target.value)} />
                </label>
                <label>
                    Exceptions:
                    <input type="text" name="exceptions" value={exceptions} onChange={event => setExceptions(event.target.value)} />
                </label>
                <label>
                    Branch:
                    <input type="text" name="branch" value={branch} onChange={event => setBranch(event.target.value)} />
                </label>
                <label>
                    Semester:
                    <input type="text" name="semester" value={semester} onChange={event => setSemester(event.target.value)} />
                </label>
                <label>
                    Clear:
                    <input type="checkbox" name="clear" value={clear} onChange={event => setClear(event.target.value)} />
                </label>
                <button type="submit">Save Report</button>
            </form>
        </div>
    )
}
