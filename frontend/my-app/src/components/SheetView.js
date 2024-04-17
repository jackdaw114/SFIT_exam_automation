import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Button } from '@mui/material';
import { useLocation } from 'react-router';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { read, utils, writeFile } from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';

const SheetView = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [sheetData, setSheetData] = useState([]);
    let location = useLocation();
    useEffect(() => {
        console.log(location.state)
        axios.post('/jason/getdata', {
            subject_id: location.state.subject,
            marks_type: location.state.marks_type,
            semester: location.state.semester, // TODO: change this to teacher backend when complete
            class_name: location.state.class
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

        axios.post('/jason/update_data', {
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








    return (
        <>
            <div className='flex flex-col w-full justify-center items-center mt-20 font-opensans'>


                <table className='border-collapse border-slate-200 border-solid w-9/12 border-spacing-x-0 border-spacing-y-2 mb-2'>

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
                        {sheetData && sheetData.map((row, index) => (

                            <tr key={index} className=" flex-none  border-b-2 border-slate-700 " >

                                <td className="text-center select-none" contentEditable="false" onBlur={(e) => handleEdit(index, 'pid', e.target.textContent)}>
                                    {row.pid}
                                </td>
                                <td className="text-center select-none" contentEditable="false" onBlur={(e) => handleEdit(index, 'name', e.target.textContent)}>
                                    {row.name}
                                </td>
                                <td className="text-center" contentEditable={isEdit} onBlur={(e) => handleEdit(index, 'marks', e.target.textContent)}>
                                    {row.marks}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <Button variant="contained" color="success" onClick={handleUpdate} className=" mx-14">Update <AutorenewIcon fontSize="small" className=" pl-1" />
                    </Button>
                    <Button color="info" sx={{ margin: '30px 5px' }} variant="contained" endIcon={isEdit ? <CancelIcon /> : <EditIcon />} onClick={() => { setIsEdit(!isEdit) }}>
                        {isEdit ? "Cancel" : "Edit"}
                    </Button>
                    <input type="file" className="fileSelect" onChange={(e) => handleInput(e)} />
                    <Button variant="contained" onClick={handleDownload} >Download File <DownloadIcon fontSize="small" className="pl-2" /> </Button>
                </div>
            </div>
        </>
    );
};

export default SheetView;
