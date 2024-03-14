import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Button } from '@mui/material';
import { useLocation } from 'react-router';

const SheetView = () => {
    const [sheetData, setSheetData] = useState([]);
    let location = useLocation();
    useEffect(() => {
        axios.post('/jason/getdata', {
            subject_id: location.state.subject,
            marks_type: location.state.marks_type,
            semester: location.state.semester // TODO: change this to teacher backend when complete
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log(res.data)
            setSheetData(res.data);
        });
    }, []);

    const handleEdit = (index, field, value) => {
        const updatedData = [...sheetData];
        updatedData[index][field] = value;
        setSheetData(updatedData);
    };


    const handleUpdate = () => {
        axios.post('/jason/update_data', {
            updated_data: sheetData,
            subject_id: location.state.subject,
            marks_type: location.state.marks_type
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log('Data updated successfully:', res.data);

        }).catch(error => {
            console.error('Error updating data:', error);
        });
    }
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>PID</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {sheetData && sheetData.map((row, index) => (
                        <tr key={index}>
                            <td contentEditable="true" onBlur={(e) => handleEdit(index, 'name', e.target.textContent)}>
                                {row.name}
                            </td>
                            <td contentEditable="true" onBlur={(e) => handleEdit(index, 'pid', e.target.textContent)}>
                                {row.pid}
                            </td>
                            <td contentEditable="true" onBlur={(e) => handleEdit(index, 'marks', e.target.textContent)}>
                                {row.marks}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button variant="contained" color="success" onClick={handleUpdate} className=" mx-14">Update <AutorenewIcon fontSize="small" className=" pl-1" />
            </Button>
        </>
    );
};

export default SheetView;
