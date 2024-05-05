import { Box, Button, Typography } from "@mui/material"
import LoginForm from "../LoginForm"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import axiosInstance from "../axiosInstance"

export default function UpdateEmail() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        new_email: "",
    })
    const labels = {
        new_email: "New Email",
    }
    const [email, setEmail] = useState(localStorage.getItem("email"))

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }

    const handleSubmit = () => {
        localStorage.setItem("email", inputs.new_email)
        axiosInstance.post('/teacher/updateemail', { email: email, new_email: inputs.new_email }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            setEmail(inputs.new_email)
            console.log("This is the new email: ", email)
            if (res.status == 201)
                alert('Email entered is the same!')
            else if (res.status == 200) {
                alert('Email updated!')
            }
            navigate('/profile')
        })
    }

    return (
        <>
            <Box padding={2} marginTop={5} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                <Typography variant='h4' fontFamily='Ubuntu,medium'>Enter New email</Typography>
                <LoginForm inputs={inputs} func={handleChange} font="black" labels={labels} />
                <Button variant='contained' onClick={handleSubmit}>update</Button>
            </Box>
        </>
    )
}