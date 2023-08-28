import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from "@mui/material"
import './ExcelCard.css'

export default function ExcelCard(props) {
    return (
        <>
            <Card sx={{ borderRadius: 4, border: 1, borderColor: '#888888' }} elevation={0}>
                <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Examination: {props.subject} of {props.semester}
                    </Typography>
                    <Typography color="text.secondary">
                        Department: {props.department}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Expand</Button>
                </CardActions>
            </Card >
        </>
    )
}