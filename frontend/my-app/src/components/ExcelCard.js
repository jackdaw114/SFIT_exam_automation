import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from "@mui/material"
import './ExcelCard.css'
import { useNavigate } from "react-router"

export default function ExcelCard(props) {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        navigate('/viewexam', { state: { _id: props._id } })
    }
    return (
        <>
            <Card sx={{ borderRadius: 4, }} elevation={0}>
                <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {props.marks_type}: {props.subject} of Semester {props.semester}
                    </Typography>
                    <Typography color="text.secondary">
                        Department: {props.department}
                    </Typography>
                    {/* <Typography color="text.secondary">
                        Year: {props.year}
                    </Typography> */}
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSubmit}>Expand</Button>
                </CardActions>
            </Card >
        </>
    )
}