export default function Gazette(props) {
    const [semester, setSemester] = useState('')
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState(0)
    const navigate = useNavigate()

    const handleChangeSemester = (e) => {
        setSemester(e.target.value)
        // console.log(e.target.value)
    }
    const handleChangeDepartment = (e) => {
        setDepartment(e.target.value)
        // console.log(e.target.value)
    }
    const handleChangeYear = (e) => {
        setYear(e.target.value)
        // console.log(e.target.value)
    }
    return (
        <>
            <div className='container-teacher-nav'>
                <Header />
                <Box className='selection-box'>
                    <Box sx={{ borderRadius: 3, margin: 2, backgroundColor: "white", display: 'flex', justifyContent: 'space-around', boxSizing: "100%", padding: 5, alignItems: 'center' }}>
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

                            <Button variant="contained" color="warning" >Create Gazette</Button>
                        </div>
                    </Box>
                </Box>

            </div>
        </>
    )

}