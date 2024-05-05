import { Box, Button, Typography } from "@mui/material"
import LoginForm from "../LoginForm"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"
import axiosInstance from "../axiosInstance"

export default function UpdateName() {
    const [inputs, setInputs] = useState({
        new_name: "",
    })
    const labels = {
        new_name: "New Name",
    }
    const navigate = useNavigate()
    const [name, setName] = useState(localStorage.getItem("username"))

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }
    const handleSubmit = () => {
        localStorage.setItem("username", inputs.new_name)
        axiosInstance.post('/teacher/updatename', { username: name, new_username: inputs.new_name }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            setName(inputs.new_name)
            console.log("This is the new no.: ", name)
            if (res.status == 201)
                alert('Number entered is the same!')
            else if (res.status == 200) {
                alert('Number updated!')
            }
            navigate('/profile')
        })
    }

    return (
        <>
            <Box padding={2} marginTop={5} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                <Typography variant='h4' fontFamily='Ubuntu,medium'>Enter New Username</Typography>
                <LoginForm inputs={inputs} func={handleChange} font="black" labels={labels} />
                <Button variant='contained' onClick={handleSubmit}>update</Button>
            </Box>
        </>
    )
}