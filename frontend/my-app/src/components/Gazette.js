import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import Header from "./Header"
import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import { writeFile } from "xlsx"

export default function Gazette(props) {
    const [semester, setSemester] = useState('')
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState(0)
    const navigate = useNavigate()

    const [select, setSelect] = useState(['Year', 'Department', 'Semester'])

    const handleChangeSemester = (e) => {
        setSemester(e.target.value);
        setSelect(select.filter(item => item !== 'Semester'));
        // console.log(e.target.value)
    };

    const handleChangeDepartment = (e) => {
        setDepartment(e.target.value);
        setSelect(select.filter(item => item !== 'Department'));
        // console.log(e.target.value)
    };

    const handleChangeYear = (e) => {
        setYear(e.target.value);
        setSelect(select.filter(item => item !== 'Year'));
        // console.log(e.target.value)
    };
    const handlesubmit = (e) => {
        axios.post('/teacher/create_gazette',
            { semester: semester, branch: department, year: year },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            }).then(res => {
                writeFile(res.data.book, `Gazette_semester_${semester}_department_${department}_year_${year}.xlsx`)
            })
    }
    return (
        <>
            <div className='w-full h-full '>
                <Box className=' mx-4'>
                    <Box sx={{ borderRadius: 3, marginTop: 2, marginBottom: 2, backgroundColor: "white", display: 'flex', justifyContent: 'space-around', boxSizing: "100%", padding: 5, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', minWidth: '70%' }}>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Year</InputLabel>
                                <Select onChange={handleChangeYear} value={year} label="Year" autoWidth>
                                    <MenuItem value="2022">2022</MenuItem>
                                    <MenuItem value="2023">2023</MenuItem>
                                    <MenuItem value="2024">2024</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Department</InputLabel>
                                <Select onChange={handleChangeDepartment} value={department} label="Department" autoWidth>
                                    <MenuItem value="CMPN">CMPN</MenuItem>
                                    <MenuItem value="EXTC">EXTC</MenuItem>
                                    <MenuItem value="MECH">MECH</MenuItem>
                                    <MenuItem value="INFT">INFT</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Semester</InputLabel>
                                <Select onChange={handleChangeSemester} value={semester} label="Semester" autoWidth>
                                    <MenuItem value={1}>Sem 1</MenuItem>
                                    <MenuItem value={2}>Sem 2</MenuItem>
                                    <MenuItem value={3}>Sem 3</MenuItem>
                                    <MenuItem value={4}>Sem 4</MenuItem>
                                    <MenuItem value={5}>Sem 5</MenuItem>
                                    <MenuItem value={6}>Sem 6</MenuItem>
                                    <MenuItem value={7}>Sem 7</MenuItem>
                                    <MenuItem value={8}>Sem 8</MenuItem>
                                </Select>
                            </FormControl>


                        </Box>

                        <div>
                            <button
                                className={`bg-orange-600 text-white font-mont py-2 px-4 rounded hover:shadow-lg transition-all duration-300 ease-in-out text-lg ${select.length !== 0 ? 'cursor-not-allowed opacity-50' : 'disabled:bg-gray-400 disabled:text-gray-700'}`}
                                onClick={handlesubmit}
                                disabled={select.length !== 0}
                            >
                                Create Gazette
                            </button>
                        </div>


                    </Box>
                </Box>
                <div className=" h-96 rounded-xl bg-white mx-4 flex justify-center items-center">
                    <div className="text-5xl flex font-mont">

                        {select.length ? <p>Please Select {select.join(', ')}</p> : <p className="text-6xl">Click on "Create Gazette"</p>}
                    </div>
                </div>

            </div>
        </>
    )

}