import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Topbar from './Topbar';
import { Paper, Switch, TextField, styled } from '@mui/material';

const borderColor = '#E0E0E0';
const drawerWidth = 240;

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    transform: 'scale(1.3)',
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#05ab63',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

function SettingDrawer(props) {

    return (<div style={{ paddingLeft: '10vw' }}>
        <Box sx={{ minHeight: '100%', position: 'fixed', height: '100%', overflowX: 'scroll', maxWidth: '20vw', width: '15vw' }}>

            <List sx={{ borderRight: 1, marginTop: 5, borderColor: borderColor }}>
                <ListItem sx={{ fontSize: 40, padding: 2, fontFamily: 'serif', fontWeight: 'bold', }}>Settings</ListItem>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} >
                        <ListItemButton sx={{
                            border: 1, borderRadius: 100,
                            borderColor: 'transparent',
                            '&:hover': {
                                borderColor: borderColor,
                                background: 'transparent',
                            },
                        }}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box></div >)
}

const StyledTextField = (props) => <TextField {...props} fullWidth sx={{ paddingTop: 1, fontSize: 20 }} variant='standard' InputProps={{
    disableUnderline: true, style: {
        fontSize: 20,
    },
}} />
const StyledTypography = (props) => <Typography {...props} sx={{ paddingTop: 3, fontFamily: 'serif', fontSize: 20 }} />

export default function Settings(props) {

    // TODO: fetch teacher data from localstorage
    const [inputs, setInputs] = React.useState({
        username: "",
        phone_no: "",
    })
    const [edit, setEdit] = React.useState(false)

    const handleToggle = () => {
        setEdit((prev) => !prev); // Toggle the state
    };
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }))
        console.log(inputs)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted Value: ', inputs);
        // TODO: implementation  
    };
    return (
        <>
            <SettingDrawer />
            <Box sx={{ marginLeft: '30vw', paddingLeft: 3, marginTop: 15, paddingTop: 2, fontSize: 40, maxWidth: '55vw' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'last baseline' }}>
                    <Typography variant='h4' sx={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'serif', paddingBottom: 2 }}> Details</Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h5' sx={{ padding: 2, fontFamily: 'serif' }} >
                            Edit
                        </Typography>
                        <IOSSwitch checked={edit} // Set the checked state of the switch
                            onChange={handleToggle} />
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
                    <StyledTypography variant='h5'>Username </StyledTypography>
                    <StyledTextField disabled={!edit} name='username' value={inputs.username}
                        onChange={handleChange}></StyledTextField>
                    <StyledTypography variant='h5'>Phone Number</StyledTypography>


                    <StyledTextField disabled={!edit} name='phone_no' value={inputs.phone_no} onChange={handleChange} ></StyledTextField>
                </Box ></Box>
        </>
    )
}
