import { Box, Button, Typography } from '@mui/material';
import Header from './Header';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import CreateTeacher from './CreateTeacher';
import DeleteTeacher from './DeleteTeacher';

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
            default: return(<></>)
            }
        }
        
        return (
            <>
            <Header />
            <Box  paddingTop={5} display={'flex'} justifyContent={'space-around'}>
                <Button variant='outlined' onClick={() => setChoice(1)}>CREATE TEACHER</Button>
                <Button variant='outlined' onClick={() => setChoice(2)}>DELETE TEACHER</Button>
                <Button variant='outlined' onClick={() => setChoice(0)}>Update TEACHER</Button>
                <Button variant='contained' onClick={() => setChoice(0)}>Generate Reports</Button>
                    <Button variant='contained' color='warning' onClick={() => setChoice(0)}>Generate Gazette</Button>
            </Box>
                
                {renderChoice()}
           
        </>
    )
}