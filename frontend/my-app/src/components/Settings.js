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
import { Button, Checkbox, FormControlLabel, MenuItem, Paper, Popper, Radio, Switch, TextField, styled } from '@mui/material';
import axios from 'axios'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CircleIcon from '@mui/icons-material/Circle';
import ChangePass from './ProfileComponents/ChangePass';


// TODO: use a variable to control font size(font size is 22) 
// TODO: figure out padding values( make them uniform   )




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

const capitalizeFirstLetter = ([first, ...rest]) => {
    return first.toUpperCase() + rest.join('');
}
function SettingDrawer(props) {

    return (<div className='-mt-5  '>
        <Box className="pl-10 pt-5 h-screen w-1/4 bg-slate-300 absolute ">
            {/* <Box sx={{ minHeight: '100%', position: 'absolute', height: '100%', maxWidth: '20vw', width: '15vw' }}> */}

            <List>
                <ListItem sx={{ fontSize: 40, padding: 1, fontWeight: 'bold', fontFamily: "Open Sans" }}>Settings</ListItem>
                {['Details', 'Subjects', 'Update'].map((text, index) => (
                    <ListItem key={text}  >
                        <ListItemButton sx={{
                            border: 1, borderRadius: 100,
                            borderColor: 'transparent',

                        }}
                            className=' hover:bg-lime-200/80 group '
                        >
                            <ListItemIcon>
                                <CircleIcon className="text-slate-700 group-hover:text-slate-500 transition-all duration-200 ease-in-out" />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box></div >)
}

const AddSubjectButton = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={onClick}
            sx={{
                borderRadius: 10,
                '&:hover': {
                    backgroundColor: '#91c496',
                },
            }}
        >
            Add Subject
        </Button>
    );
};
const ApprovalButton = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            color="secondary"

            onClick={onClick}
            startIcon={<AssignmentIndIcon />}
            sx={{

                borderRadius: 10,
                '&:hover': {
                    backgroundColor: '#91c496',
                },
            }}
        >
            Update Profile
        </Button>
    );
};


const DynamicTextFields = () => {
    const [fields, setFields] = React.useState([]);
    const [update, setUpdate] = React.useState();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [checkboxes, setCheckboxes] = React.useState([]);
    const [classCheckboxes, setClassCheckboxes] = React.useState([]);
    const [subjectList, setSubjectList] = React.useState([])


    const handleClassChange = (index, fieldName) => {
        console.log(fieldName)
        const updatedCheckboxes = [...classCheckboxes];
        updatedCheckboxes[index] = { selectedValue: fieldName };
        console.log(updatedCheckboxes)
        setClassCheckboxes(updatedCheckboxes);
    };


    const handleCheckboxChange = (index, fieldName) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index][fieldName] = !updatedCheckboxes[index][fieldName];
        setCheckboxes(updatedCheckboxes);
    };
    const addTextField = () => {
        const newFields = [...fields, { id: fields.length + 1, value: '' }];
        const newCheckbox = [...checkboxes, { term: false, oral: false, practical: false }]
        const newClassCheckbox = [...classCheckboxes, { selectedValue: 'A' }]
        setClassCheckboxes(newClassCheckbox)
        setFields(newFields);
        setCheckboxes(newCheckbox);
    };

    const removeTextField = (id) => {
        const updatedFields = fields.filter((field) => field.id !== id);
        setFields(updatedFields);
    };

    const handleChange = (id, newValue) => {
        console.log(newValue)
        const updatedFields = fields.map((field) =>
            field.id === id ? { ...field, value: newValue } : field
        );
        setFields(updatedFields);
    };
    React.useEffect(() => {
        axios.get('/teacher/subjectlist').then(res => {
            setSubjectList(res.data)
            console.log(res.data)
        })
    }, [update])
    const updateTeacherSubject = () => {
        fields.map((subject, index) => {
            if (subject.value) {
                console.log(subject)
                axios.post('/teacher/updateteachersubject', { subject_id: subject.value, teacher_id: localStorage.getItem('username'), ...checkboxes[index], class: classCheckboxes[index]['selectedValue'] }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                }).then(res => {
                    alert('subject list updated successfully')
                })
            }
        })

    }
    return (
        <div style={{ paddingTop: 20 }}>
            {fields.map((field, index) => (
                <div>
                    <div key={field.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                        <TextField
                            label={`Add Subject `}
                            id={field.id}
                            value={field.value}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                            select

                            sx={{ width: 'auto', minWidth: 300 }}
                            InputProps={{
                                sx: {
                                    borderRadius: 5,
                                },
                            }}

                        >{subjectList ? (


                            subjectList.map((option, index) => (
                                <MenuItem PopperProps={{
                                    sx: {
                                        borderRadius: 5,
                                    },
                                }} key={option._id} value={option._id} >
                                    {option.subject_id} - {option.subject_name}
                                </MenuItem>
                            ))


                        ) : (
                            <></>
                        )}
                        </TextField>
                        {/* TODO: u might want to make it a component do this last also change the styling here if u desire */}

                        <FormControlLabel sx={{ marginLeft: 10 }}
                            control={<Checkbox
                                checked={checkboxes[index].term}
                                onChange={() => handleCheckboxChange(index, 'term')}
                            />}
                            label="Term Work"
                            labelPlacement='top'
                        />
                        <FormControlLabel sx={{ marginLeft: 10 }}
                            control={<Checkbox
                                checked={checkboxes[index].oral}
                                onChange={() => handleCheckboxChange(index, 'oral')}
                            />}
                            label="Oral"
                            labelPlacement='top'
                        />
                        <FormControlLabel sx={{ marginLeft: 10 }}
                            control={<Checkbox
                                checked={checkboxes[index].practical}
                                onChange={() => handleCheckboxChange(index, 'practical')}
                            />}
                            label="Practicals"
                            labelPlacement='top'
                        />


                        <IconButton sx={{ marginLeft: 10, border: 1 }} onClick={() => removeTextField(field.id)}>
                            <RemoveIcon sx={{ color: 'red' }} />
                        </IconButton>
                    </div>

                    <div>

                        <FormControlLabel sx={{ marginLeft: 10 }}
                            control={<Radio
                                checked={classCheckboxes[index]['selectedValue'] === 'A'}
                                onChange={() => handleClassChange(index, 'A')}
                                value='A'
                                name="class-radio"

                            />}
                            label="A"
                            labelPlacement='top'
                        />
                        <FormControlLabel sx={{ marginLeft: 10 }}
                            control={<Radio
                                checked={classCheckboxes[index]['selectedValue'] === 'B'}
                                onChange={() => handleClassChange(index, 'B')}
                                value='B'
                                name="class-radio"
                            />}
                            label="B"
                            labelPlacement='top'
                        />
                    </div>
                </div>

            ))
            }
            <AddSubjectButton onClick={addTextField} />
            <Divider sx={{ paddingTop: 1 }} />
            <ApprovalButton onClick={updateTeacherSubject} />
        </div >
    );
};


const StyledTextField = (props) => <TextField {...props} fullWidth sx={{
    paddingTop: 3, paddingBottom: 2, fontSize: 20, '& .MuiInput-underline:after': {
        borderBottomColor: '#6ca178c',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: '#DDDDDD',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: '#999999',
    },
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000", // Change this to the color you prefer
    },
}} variant='standard' InputProps={{
    disableUnderline: props.edit ? true : false, style: {
        fontSize: 22,

        fontWeight: 'bold'
    },

}} />
const StyledTypography = (props) => <Typography {...props} sx={{ paddingTop: 1, fontSize: 22, fontFamily: "Open Sans" }} />
const SettingsHeaderTypography = (props) => <Typography {...props} variant='h4' sx={{ fontSize: 28, fontWeight: 'bold', fontFamily: "Open Sans", paddingBottom: 2, paddingTop: 3 }} />


export default function Settings(props) {
    const [update, setUpdate] = React.useState(false);
    const [pass, setPass] = React.useState(false);
    const [subjectList, setSubjectList] = React.useState([])

    // TODO: fetch teacher data from localstorage
    const [inputs, setInputs] = React.useState({
        username: capitalizeFirstLetter(localStorage.getItem('username')),
        phone_no: "",
    })
    const [switches, setSwitches] = React.useState({
        switch1: false,
        switch2: false,
        switch3: false,
    });
    const handleSwitchChange = (name) => (event) => {
        setSwitches({ ...switches, [name]: event.target.checked });
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
        // TODO: implementation (Axios request for teacher data update)
    };

    const handleClick = () => {
        setPass(pass => !pass)
    }


    React.useEffect(() => {
        axios.post('teacher/teachersubjects', { teacher_id: localStorage.getItem('username') }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then(res => {
            setSubjectList(res.data.subject_list)
            console.log(res.data.subject_list)
        })

    }, [update]);
    return (
        <>
            <div className='font-opensans'>

                {/* <SettingDrawer /> */}
                <Box sx={{
                    paddingLeft: 3, marginTop: 2,
                    paddingTop: 2,
                    paddingBottom: 3,
                    fontSize: 40, maxWidth: '55vw', fontFamily: "opensans"
                }}>
                    <div className=' bg-slate-100 p-10 rounded-lg mb-10'>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'last baseline' }}>
                            <SettingsHeaderTypography > Details</SettingsHeaderTypography>
                            {/* TODO: grid view for Details will look better {this is the personal data section } */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant='h5' sx={{ padding: 2, }} >
                                    Edit
                                </Typography>
                                <IOSSwitch
                                    checked={switches.switch1}
                                    onChange={handleSwitchChange('switch1')} />
                            </Box>
                        </Box>
                        <Divider sx={{ marginBottom: 2 }} />

                        <Box sx={{ paddingLeft: 2 }} className="font-opensans">
                            <div className='flex justify-start'>

                                <StyledTypography className="pt-7 w-1/4" variant='h5'>Username : &nbsp;</StyledTypography>
                                <StyledTextField className="w-1/2" edit={!switches.switch1} disabled={!switches.switch1} name='username' value={inputs.username}
                                    onChange={handleChange}></StyledTextField>
                            </div>

                            {switches.switch1 && <Button variant='contained' color='warning' onClick={handleClick}>Change Password</Button>}

                            {switches.switch1 && pass && <>
                                <ChangePass handleClick={handleClick} />
                            </>}



                        </Box >
                    </div>

                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'last baseline' }}>
                            <SettingsHeaderTypography variant='h4' sx={{ fontSize: 28, fontWeight: 'bold', paddingBottom: 2 }}>Subjects Taught</SettingsHeaderTypography>


                        </Box>
                        {/* TODO: change padding here {this is the Subjects taught settings } */}
                        <Divider sx={{ marginBottom: 2 }} />

                        {subjectList.map((item, index) => (
                            // TODO: change styling here aswell {this is the Subjects taught settings }

                            <Typography variant='h5' sx={{ paddingLeft: 2, paddingTop: 1, fontSize: 22 }}>{item.subject_id} - {item.subject_name} </Typography>
                        ))
                        }

                    </Box>
                    <Box sx={{ paddingLeft: 1 }}>
                        <DynamicTextFields />
                    </Box>
                    {/* <Divider sx={{ marginBottom: 2, marginTop: 3 }} /> */}




                    {/* <ApprovalButton /> TODO: figure how this can call multiple functions */}


                </Box >
            </div>
        </>
    )
}
