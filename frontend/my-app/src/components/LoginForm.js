import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function LoginForm(props) {

    let list_keys = []
    for (const [key, value] of Object.entries(props.inputs)) {
        list_keys.push(key)
    }
    console.log(props.inputs)
    console.log(list_keys)

    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }
        }>


            {list_keys.map((item) => {
                return (

                    <TextField
                        onChange={props.func}
                        sx={{
                            width: "300px",
                            input: { color: props.font }
                        }}
                        // value={props.inputs.username|| ''}
                        value={props.inputs[item] || ''}
                        name={item}
                        variant="outlined"
                        placeholder={item}
                        type={item}
                        margin="normal" />
                )
            })}


            {/* <TextField
                onChange={props.func}
                sx={{
                    width: "300px",
                    input: { color: props.font }
                }}
                value={props.inputs.password}
                name="password"
                variant="outlined"
                placeholder='password'
                type='password'
                margin="normal" /> */}

        </Box >
    )
}