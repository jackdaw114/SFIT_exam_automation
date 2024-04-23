import { Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from "@mui/material"
import './ExcelCard.css'
import { useNavigate } from "react-router"
import * as Romanice from 'romanice';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

export default function ExcelCard(props) {
    const { romanice } = Romanice;
    const standardConverter = romanice();
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        navigate('/viewexam', {
            state: {
                subject: props.subject[0],
                marks_type: props.marks_type,
                semester: props.semester,
                class_name: props.class
            }
        })
    }
    return (
        <>
            <Card sx={{ borderRadius: 2, }} elevation={2} className="w-full group flex justify-between transition-colors hover:bg-green-50/80 ease-in-out duration-200 delay-75 py-1">
                <CardContent className="  select-none">


                    <Typography variant="h5" color="text.secondary" className="font-semibold transition-all duration-200 ease-in-out group-hover:text-red-800/90 text-lg">
                        {(props.subject[0]).toUpperCase() + " - " + props.subject.slice(1)}: {props.marks_type[0].toUpperCase() + props.marks_type.slice(1)} -
                        Sem&nbsp;
                        {standardConverter.toRoman(props.semester)}

                    </Typography>

                    {/* <Typography color="text.secondary">
                        Year: {props.year}
                    </Typography> */}
                </CardContent>
                <div className="  absolute w-4/5 text-center flex justify-center items-center select-none transition-all
                duration-150 ease-in-out hover:text-sky-900 hover:opacity-25 font-anta font-thin opacity-5 text-6xl">


                    {props.department}

                </div>
                <CardActions className="pr-16">
                    <Button size="small" onClick={handleSubmit} className=" px-8 transition-all hover:bg-sky-900/80  hover:text-white duration-150 ease-in-out hover:shadow-md rounded-2xl hover:border-2">Expand <ArrowOutwardIcon fontSize="small" className=" pl-1  opacity-75 -mt-0.5" /> </Button>
                    <Button size="small" color="warning"><DeleteIcon /></Button>
                </CardActions>
            </Card >
        </>
    )
}