import { AppBar, Box, Grid, Hidden, Icon, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import './Home2.css'
import { styled } from '@mui/material/styles';
import Topbar from "./Topbar";
import img from '../imgtest/favicon.ico'

const boxMinHeight = 200;
const boxMaxHeight = 400;

const coloors_gc = ['#80e7b6', '#c3e8d6', '#84cded', '#9fffaa', '#80f5cd', '#96b5ff']

const ItemStyle = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,

    color: theme.palette.text.secondary,

    minHeight: boxMinHeight,
    borderRadius: 10,
    overflow: 'hidden',
    //border:'1px solid black',
    boxShadow: ' 0px 0px 1px  grey'
}));

const Item = (props) => <ItemStyle {...props} elevation={0} />
const IC_Grid = (props) => <Grid {...props} container item spacing={5} />
const I_Grid = (props) => <Grid {...props} item />

const CustIcon = (props) => <Icon {...props} style={{ color: '#555555', padding: 6, borderRadius: 100, }} />

const CustGrid = (props) => {
    return (
        <Grid item sx={6} md={6}>
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CustIcon sx={{ backgroundColor: coloors_gc[Math.floor(Math.random() * 6)] }}>
                    {props.icon}
                </CustIcon>
                <Typography variant="h8" display='inline' sx={{ textDecoration: 'underline', paddingLeft: 1, paddingRight: 1.5, width: 100, color: '#333333' }}>{props.text}</Typography>
            </Box>
        </Grid >
    )
}


CustGrid.defaultProps = {
    text: 'not defined',
    icon: <AddBoxOutlinedIcon />

}

const analysis = [{ name: 'Reval Result', },
{ name: 'KT Count Report', },
{ name: 'OverAll Analysis', },
{ name: 'Toppers Analysis', },
{ name: 'Statistical Analysis', },
{ name: 'Male/Female Analysis', },
{ name: 'Failed Students Report', },
{ name: 'Attendance Sheet', },
{ name: 'Appearing Students List', },
{ name: 'Caste-Wise Analysis', },
{ name: 'SGPI Report', },
{ name: 'IA Fail Report', },
{ name: 'TW/OR/PR FailReport', },
{ name: 'Student Appeared Count', },
{ name: 'Absent Attendance Report', },
{ name: 'Lower SGPI/Grand Total Report', },
]


function HomeGrid() {

    return (
        <Grid container spacing={5} sx={{ paddingLeft: 20, paddingTop: 2, paddingRight: 20 }}>

            <IC_Grid>
                <I_Grid xs={6} md={4}>

                    <Item className='paper' sx={{ backgroundColor: '#f9fff5' }} elevation={0}>
                        <Toolbar sx={{ justifyContent: 'center', backgroundColor: '#e2fbe4', }}  >

                            <Typography sx={{ paddingTop: 0.5, paddingLeft: 1, color: 'black' }} variant="h5">Student Details</Typography>

                        </Toolbar>
                        <Grid container spacing={5} sx={{ padding: 3, overflow: 'scroll', maxHeight: boxMaxHeight }}>

                            {analysis.map((item, index) => (
                                <CustGrid text={item.name} />
                            ))
                            }
                        </Grid>
                    </Item>
                </I_Grid>
                <I_Grid xs={6} md={4}><Item>test</Item></I_Grid>

                <I_Grid xs={6} md={4}><Item>test</Item></I_Grid>

            </IC_Grid>

            <IC_Grid >
                <I_Grid xs={12}><Item>test</Item></I_Grid>
            </IC_Grid>

            <IC_Grid >
                <I_Grid xs={12}> <Item>test</Item></I_Grid>

            </IC_Grid>

            <IC_Grid >
                <I_Grid xs={12}> <Item>test</Item></I_Grid>
            </IC_Grid>

        </Grid>
    )
}


export default function Home() {
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Toolbar >
                <AppBar sx={{ backgroundColor: 'white' }} elevation={3}>
                    <Box sx={{ display: 'flex', padding: 1 }} >
                        <img src={img} alt="sfit" style={{ height: '100px' }}></img>
                    </Box>

                </AppBar>
            </Toolbar>
            <Toolbar />
            <HomeGrid />
        </Box>
    )
}

