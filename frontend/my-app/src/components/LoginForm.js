import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function LoginForm(props) {


    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }
        } >

            <TextField
                onChange={props.func}

                sx={{
                    width: "300px",
                    input: { color: "white" }
                }}
                value={props.inputs.username || ''}
                name="username"
                variant="outlined"
                placeholder='username'
                margin="normal" />


            <TextField
                onChange={props.func}
                sx={{
                    width: "300px",
                    input: { color: "white" }
                }}
                value={props.inputs.password}
                name="password"
                variant="outlined"
                placeholder='password'
                type='password'
                margin="normal" />

        </Box >
    )
}