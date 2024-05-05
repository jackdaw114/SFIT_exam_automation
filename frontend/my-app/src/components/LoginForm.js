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

        <Box className=" w-full items-center" sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }
        }>
            {list_keys.map((item) => {
                return (

                    <TextField
                        onChange={props.func}
                        sx={{
                            width: "80%",
                            input: { color: props.font }
                        }}

                        value={props.inputs[item] || ''}
                        name={item}
                        variant="outlined"
                        placeholder={props.labels[item] || item}
                        type={item}
                        margin="normal" />
                )
            })}
        </Box >
    )
}