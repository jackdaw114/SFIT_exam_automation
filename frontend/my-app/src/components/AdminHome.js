import { Box, Button, Typography } from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import CreateTeacher from './CreateTeacher';
import DeleteTeacher from './DeleteTeacher';
import UpdateTeacher from './UpdateTeacher';
import Gazette from './Gazette';
import Report from './Report';

export default function AdminHome() {
    let navigate = useNavigate()
    // const navToCreate = () => {
    //     navigate('/createteacher')
    // }
    const [choice, setChoice] = useState(0)

    const renderChoice = () => {
        console.log(choice)
        switch (choice) {
            case 1:
                return (<CreateTeacher />);
            case 2:
                return (<DeleteTeacher />);
            case 3:
                return (<UpdateTeacher />);
            case 4:
                return (<Gazette />);
            case 5:
                return (<Report />)
            default: return (<></>)
        }
    }


    return (
        <>
            {/* <Header /> */}
            <div className=" flex min-h-screen h-full ">

                <Box className="flex flex-col min-h-screen h-full bg-sky-100 w-1/5 ">
                    <Button className='my-10 mx-8' variant='contained' onClick={() => setChoice(1)}>CREATE TEACHER</Button>
                    <Button className='my-10 mx-8' variant='contained' onClick={() => setChoice(2)}>DELETE TEACHER</Button>
                    <Button className='my-10 mx-8' variant='contained' onClick={() => setChoice(3)}>Update TEACHER</Button>
                    {/* <Button variant='contained' onClick={() => setChoice(0)}>Generate Reports</Button> */}
                    <Button className='my-10 mx-8' variant='contained' color='warning' onClick={() => setChoice(4)}>Generate Gazette</Button>
                    <Button className='my-10 mx-8' variant='contained' color='warning' onClick={() => setChoice(5)}>Generate Report</Button>
                </Box>
                <div className='w-4/5 flex justify-center  bg-slate-300'>

                    {renderChoice()}
                </div>
            </div>

        </>
    )
}