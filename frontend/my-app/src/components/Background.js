import { Box } from "@mui/material";
import { useContext } from "react";
import { BackgroundContext } from "./BackgroundContext";

export default function Background() {
    const { customBackgroundColor } = useContext(BackgroundContext)
    return (
        <Box sx={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: customBackgroundColor, zIndex: -9999 }}>
        </Box>

    )
}