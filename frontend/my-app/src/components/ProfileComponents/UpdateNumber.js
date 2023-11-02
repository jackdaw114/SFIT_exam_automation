import { Box, Button, Typography } from "@mui/material"
import LoginForm from "../LoginForm"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export default function UpdateNumber() {
    const [inputs, setInputs] = useState({
        new_number: "",
    })
    const labels = {
        new_number: "New Phone No.",
    }
    const navigate = useNavigate()
    const [number, setNumber] = useState(localStorage.getItem("phoneNo"))

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }
    const handleSubmit = () => {
        localStorage.setItem("phoneNo",inputs.new_number)
        axios.post('/teacher/updatenumber', { phoneNo: number, new_phoneNo: inputs.new_number }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            setNumber(inputs.new_number)
            console.log("This is the new no.: ",number)
            if (res.status == 201)
                alert('Name entered is the same!')
            else if (res.status == 200) {
                alert('Name updated!')
            }
            navigate('/profile')
        })
    }

    return (
        <>
            <Box padding={2} marginTop={5} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                <Typography variant='h4' fontFamily='Ubuntu,medium'>Enter New Phone No.</Typography>
                <LoginForm inputs={inputs} func={handleChange} font="black" labels={labels} />
                <Button variant='contained' onClick={handleSubmit}>update</Button>
            </Box>
        </>
    )
}