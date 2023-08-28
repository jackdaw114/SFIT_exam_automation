import { Box, Button, MenuItem, Select } from "@mui/material";
import Header from "./Header";

export default function TeacherNav() {
    return (
        <>
            <Header />
            <Box sx={{ padding: 2, backgroundColor: '#f1f1f1' }}>
                <Box sx={{ backgroundColor: "white", border: 1, display: 'flex' }}>
                    <label>select exam type</label>
                    <Select>
                        <MenuItem value="oral">Oral</MenuItem>
                        <MenuItem value="practical">Practical</MenuItem>
                        <MenuItem value="theory">Theory</MenuItem>
                        <MenuItem value="term-work">Term Work</MenuItem>
                    </Select>
                </Box>
            </Box>
        </>
    )
}