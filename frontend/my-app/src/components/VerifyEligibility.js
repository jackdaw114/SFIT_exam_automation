
import { Typography,Box } from '@mui/material';
import Header from './Header';
import NewSheet from './NewSheet';

export default function VerifyEligibility() {
    const DummyData = [
        { id: 1, name: 'Jason', age: 21, class: 'TEACMPN' ,hobby: 'coding' },
        { id: 2, name: 'Aslin', age: 17, class: 'TEACMPN' ,hobby: 'basketball' },
        { id: 3, name: 'Nigel', age: 20, class: 'TEACMPN' ,hobby: 'valorant' },
        { id: 4, name: 'Callahan', age: 20, class: 'TEACMPN' ,hobby: 'Women' },
      ]
    return (
        <>
            <Box className='h_background' sx={{ flexGrow: 1, minHeight: '100vh' }}>
                <Header />
                <NewSheet table={DummyData } />
            </Box>
        </>
    )
}