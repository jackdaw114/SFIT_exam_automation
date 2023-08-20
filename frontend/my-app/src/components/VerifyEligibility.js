
import { Typography,Box } from '@mui/material';
import Header from './Header';
import NewSheet from './NewSheet';

export default function VerifyEligibility() {
    return (
        <>
            <Box className='h_background' sx={{ flexGrow: 1, minHeight: '100vh' }}>
                <Header />
                <NewSheet/>
            </Box>
        </>
    )
}