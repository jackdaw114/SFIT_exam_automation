import { Box, Button, Typography } from "@mui/material"
import LoginForm from "../LoginForm"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export default function ChangePass() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        password: "",
        new_password: "",
    })
    const labels = {
        password: "Current Password",
        new_password: "New Password",
    }
    const [password, setPassword] = useState(localStorage.getItem("password"))
    const [newPassword, setNewPassword] = useState("")

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
    }

    const handleSubmit = () => {
        localStorage.setItem("password", inputs.password)
        axios.post('/teacher/changepassword', { password: inputs.password, new_password: inputs.new_password }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((res) => {
            setPassword(inputs.new_password)
            setNewPassword("")
            // console.log("This is the new e: ",email)
            if (res.status == 201)
                alert('Password entered is the same!')
            else if (res.status == 200) {
                alert('Password updated!')
            }
            else if (res.status == 202) {
                alert("Incorrect password! Re-Enter password")
            }

        })
    }

    return (
        <>
            <Box padding={2} marginTop={5} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                <Typography variant='h4' fontFamily='Ubuntu,medium'>Enter New Password</Typography>
                <LoginForm inputs={inputs} func={handleChange} font="black" labels={labels} />
                <Button variant='contained' onClick={handleSubmit}>update</Button>
            </Box>
        </>
    )
}