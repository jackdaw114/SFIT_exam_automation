import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "./Header";
import { toExcel } from "./Excel";
import { useState } from "react";
import axios from "axios";
import { read, utils, write, writeFile } from "xlsx";
import { saveAs } from "file-saver";


export default function TeacherNav() {

    const [type,setType] = useState('')
    const [subject,setSubject] = useState('')
    const [studentDetails, setStudentDetails] = useState([])
    const handleChangeType = (e) => {
        setType(e.target.value)
        console.log(e.target.value)
    }
    const handleChangeSubject = (e) => {
        setSubject(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = async(e) => {
        await axios.get('/teacher/getstudents').then((res) => {
            setStudentDetails(res.data)
        })

        const jsonData = []
        await studentDetails.map((value, index) => {
            jsonData.push({
                pid: value.pid,
                name: value.name,
                teacher_name: localStorage.getItem('username'),
                marks: -8
            })
            //return({pid:value.pid,name:value.name,marks_type:type,teacher_name:localStorage.getItem('username')})
        })
        const binaryData = await toExcel(jsonData)
        const reader = read(binaryData,{type:'binary'})
         writeFile(reader,'text.xlsx')
        // var blob = new Blob(
    //     [binaryString],
    //     {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"}
    // );
    //     saveAs()
    }


    return (
        <>
            <Header />
            <Box sx={{ padding: 2, backgroundColor: '#78658C'}}>
                <Box sx={{ borderRadius:3, backgroundColor: "white", border: 0.75, display: 'flex', justifyContent: 'space-around',boxSizing:"100%",padding: 5,}}>
                    <Box sx={{ display:'flex',justifyContent:'space-evenly' }}>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel>Select Examination</InputLabel>
                        <Select onChange={handleChangeType} value={type} label="Select Examination" autoWidth>
                        <MenuItem value="oral">Oral</MenuItem>
                        <MenuItem value="practical">Practical</MenuItem>
                        <MenuItem value="theory">Theory</MenuItem>
                        <MenuItem value="term-work">Term Work</MenuItem>
                        <MenuItem value="iat">IAT</MenuItem>
                    </Select>
                        </FormControl>
                        <FormControl sx={{minWidth: 200}}>
                            <InputLabel>Select Subject</InputLabel>
                        <Select onChange={handleChangeSubject} value={subject} label="Select Subject" autoWidth>
                        <MenuItem value="sub1">Subject 1</MenuItem>
                        <MenuItem value="sub2">Subject 2</MenuItem>
                        <MenuItem value="sub3">Subject 3</MenuItem>
                        
                    </Select>
                        </FormControl>
                    </Box>
                    <div>

                    <Button variant="contained" color="warning" onClick={handleSubmit}>Generate Template</Button>
                    </div>
                </Box>
            </Box>
        </>
    )
}