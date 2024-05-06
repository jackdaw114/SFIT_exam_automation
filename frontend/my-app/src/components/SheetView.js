import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Button } from '@mui/material';
import { useLocation } from 'react-router';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { read, utils, writeFile } from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './axiosInstance';


const SheetView = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [sheetData, setSheetData] = useState([]);
    let location = useLocation();
    const [maxMarks, setMaxMarks] = useState(0);
    const handleEdit = (index, field, value) => {
        const updatedData = [...sheetData];
        let newValue = Number(value);

        if (isNaN(newValue) || value.trim() === '') {
            // Input is not a valid number or is empty
            // Handle the error condition here if needed
            console.log('weeeeee')
            return;
        }

        if (newValue > maxMarks) {
            // Value exceeds maxMarks
            // Display a notification or handle the error condition here

            updatedData[index][field] = -8;
            setSheetData(updatedData);
            console.log(sheetData)
            toast("Value cannot exceed maxMarks.");
            return;
        }
        else {
            // Update the data
            updatedData[index][field] = newValue;

            setSheetData(updatedData);
        }
    };


    const handleUpdate = () => {
        axiosInstance.post('/teacher/update_data', {
            updated_data: sheetData,
            subject_id: location.state.subject,
            marks_type: location.state.marks_type
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log("This is sheet data", sheetData)
            console.log('Data updated successfully:', res.data);

        }).catch(error => {
            console.error('Error updating data:', error);
        });
    }

    const handleDownload = () => {
        const modifiedData = sheetData.map(({ _id, ...rest }) => rest);
        const sheet = utils.json_to_sheet(modifiedData, { header: "" });
        const wb = utils.book_new();
        utils.book_append_sheet(wb, sheet, 'sheet1');
        writeFile(wb, 'test.xlsx');
    }

    const handleInput = async (e) => {
        e.preventDefault();


        const file = e.target.files[0];

        // Read the Excel file into an ArrayBuffer
        const data = await file.arrayBuffer();

        // Convert the ArrayBuffer to a workbook object
        const workbook = read(data);

        // Convert the first sheet of the workbook to JSON
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(sheet, { header: ["name", "pid", "marks"] });

        // Extract _id from sheetData
        const _idArray = sheetData.map(row => row._id);

        // Map _id values to jsonData, starting from index 1
        const finalJsonData = jsonData.slice(1).map((row, index) => ({ _id: _idArray[index], ...row }));

        // Now finalJsonData contains the JSON representation of your Excel data with _id included, excluding the first row
        console.log("This is final json", finalJsonData);

        axiosInstance.post('/teacher/update_data', {
            updated_data: finalJsonData,
            subject_id: location.state.subject,
            marks_type: location.state.marks_type
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log('Excel Data updated successfully:', res.data);

        }).catch(error => {
            console.error('Error updating data:', error);
        });

    };
    useEffect(() => {
        console.log("Current State= ", location.state)


        switch (location.state.marks_type) {
            case 'term':
                setMaxMarks(50)
                break;
            case 'practical':
                setMaxMarks(20)
                break;
            case 'oral':
                setMaxMarks(5)
        }
        const data = {
            subject_id: location.state.subject,
            marks_type: location.state.marks_type,
            semester: location.state.semester, // TODO: change this to teacher backend when complete
            class_name: location.state.class
        }
        console.log("Current Data=", data)

        axiosInstance.post('/teacher/getdata', data, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log(res.data)
            setSheetData(res.data);
        });
    }, []);
    const handleRestrict = (e) => {
        console.log(e.target.textContent)

        if (isNaN(Number(e.target.textContent)) || e.target.textContent == '-') {
            toast("Value should be numeric.");
        }
    }

    return (
        <>
            <div className='flex flex-col w-full justify-center items-center  font-opensans'>


                <table className='border-collapse border-slate-200 border-solid w-9/12 border-spacing-x-0 border-spacing-y-2 mb-2 mt-10 '>

                    <caption class="caption-top opacity-60 mb-3">
                        Table - {location.state.subject} , {location.state.marks_type} Work
                    </caption>
                    <thead className=' bg-primary text-white  text-center bg-clip-border text-lg'>
                        <tr>
                            <td>PID</td>
                            <td>Student Name</td>
                            <td>Marks</td>
                        </tr>
                    </thead>
                    <tbody className='text-lg' >
                        {sheetData && sheetData.map((row, index) => {
                            let background = '#ffffffff';
                            if (row.marks < 0)
                                background = '#FFB86F'
                            else if (row.marks >= 0 && row.marks <= (maxMarks * 0.35))
                                background = '#E36588'
                            else if (row.marks == maxMarks)
                                background = '#ADF7B6'

                            return (
                                <tr key={index} className=" flex-none  border-b-2 border-slate-700  " style={{ backgroundColor: background, maxHeight: '1.5rem' }} >

                                    <td className="text-center select-none" contentEditable="false" onBlur={(e) => handleEdit(index, 'pid', e.target.textContent)}>
                                        {row.pid}
                                    </td>
                                    <td className="text-center select-none" contentEditable="false" onBlur={(e) => handleEdit(index, 'name', e.target.textContent)}>
                                        {row.name}
                                    </td>
                                    <td className="text-center max-h-1" style={{ maxHeight: '1.5em' }} onInput={handleRestrict} contentEditable={isEdit} onBlur={(e) => handleEdit(index, 'marks', e.target.textContent)}>
                                        {row.marks}
                                    </td>

                                </tr>)
                        })}
                    </tbody>
                </table>
                <div>
                    <Button variant="contained" color="success" onClick={handleUpdate} className=" mx-14">Update <AutorenewIcon fontSize="small" className=" pl-1" />
                    </Button>
                    <Button color="info" sx={{ margin: '30px 5px' }} variant="contained" endIcon={isEdit ? <CancelIcon /> : <EditIcon />} onClick={() => { setIsEdit(!isEdit) }}>
                        {isEdit ? "Cancel" : "Edit"}
                    </Button>
                    <label className='border rounded text-white' style={{ backgroundColor: '#454545', margin: 10, marginTop: 12, padding: 8 }} >
                        Upload
                        <input type="file" className="fileSelect" style={{ display: 'none' }} onChange={(e) => handleInput(e)} />
                    </label>
                    <Button variant="contained" onClick={handleDownload} >Download File <DownloadIcon fontSize="small" className="pl-2" /> </Button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default SheetView;
