import { AppBar, Box, Grid, Hidden, Icon, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import './Home2.css'
import { styled } from '@mui/material/styles';
import Topbar from "./Topbar";
import { motion } from 'framer-motion'
import img from '../imgtest/favicon.ico'
import ArticleIcon from '@mui/icons-material/Article';
import RuleIcon from '@mui/icons-material/Rule';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TableChartIcon from '@mui/icons-material/TableChart';
import WcIcon from '@mui/icons-material/Wc';
import CancelIcon from '@mui/icons-material/Cancel';
import ChecklistIcon from '@mui/icons-material/Checklist';

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


const IC_Grid = (props) => <Grid {...props} item container spacing={5} />
const I_Grid = (props) => <Grid {...props} item />


const CustIcon = (props) => <span {...props} />

const CustGrid = (props) => {
    return (
        <Grid item sx={6} md={6}>
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CustIcon style={{ height: 35, color: '#555555', padding: 8, borderRadius: 100, backgroundColor: coloors_gc[Math.floor(Math.random() * 6)] }}>
                    {props.icon}
                </CustIcon>
                <Typography variant="h8" display='inline' sx={{ textDecoration: 'underline', paddingLeft: 1, paddingRight: 1.5, width: 100, color: '#333333' }}>{props.text}</Typography>
            </Box>
        </Grid >
    )
}


CustGrid.defaultProps = {
    text: 'not defined',
    icon: <AddBoxOutlinedIcon fontSize="large" />

}

const analysis = [{ name: 'Reval Result', icon: <ArticleIcon fontSize="large" /> },
{ name: 'KT Count Report', icon: <RuleIcon fontSize="large" /> },
{ name: 'OverAll Analysis', icon: <BarChartIcon fontSize="large" /> },
{ name: 'Toppers Analysis', icon: <TrendingUpIcon fontSize="large" /> },
{ name: 'Statistical Analysis', icon: <TableChartIcon fontSize="large" /> },
{ name: 'Male/Female Analysis', icon: <WcIcon fontSize="large" /> },
{ name: 'Failed Students Report', icon: <CancelIcon fontSize="large" /> },
{ name: 'Attendance Sheet', icon: <ChecklistIcon fontSize="large" /> },
{ name: 'Appearing Students List', icon: <AddBoxOutlinedIcon fontSize="large" /> },
{ name: 'Caste-Wise Analysis', icon: <AddBoxOutlinedIcon fontSize="large" /> },
{ name: 'SGPI Report', icon: <AddBoxOutlinedIcon fontSize="large" /> },
{ name: 'IA Fail Report', icon: <AddBoxOutlinedIcon fontSize="large" /> },
{ name: 'TW/OR/PR FailReport', icon: <AddBoxOutlinedIcon fontSize="large" /> },
{ name: 'Student Appeared Count', icon: <AddBoxOutlinedIcon fontSize="large" /> },
{ name: 'Absent Attendance Report', icon: <AddBoxOutlinedIcon fontSize="large" /> },
{ name: 'Lower SGPI/Grand Total Report', icon: <AddBoxOutlinedIcon fontSize="large" /> },
]


const MotionDiv = (props) => <motion.div {...props} whileHover={{ filter: `grayscale(0%) hue-rotate(${props.hue}deg)` }}
    style={{
        backgroundColor: '#f9fff5', borderRadius: 10, overflow: 'hidden',
        boxShadow: ' 0px 0px 1px  grey', filter: `grayscale(100%) hue-rotate(${props.hue}deg)`
    }} />

MotionDiv.defaultProps = {
    hue: 0
}


function HomeGrid() {

    return (
        <Grid container spacing={5} sx={{ paddingLeft: 20, paddingTop: 2, paddingRight: 20, paddingBottom: 3 }}>

            <IC_Grid>
                <I_Grid xs={6} md={4}>


                    <MotionDiv >

                        <span style={{ filter: 'drop-shadow(2px 0px 2px rgba(50,50,50,0.7   ))' }}>
                            <Toolbar className="clippath" sx={{ backgroundColor: '#C3EDC0', height: 100, }} >
                                <Typography sx={{ fontFamily: 'ubuntu ', textDecoration: 'underline', margin: 0, paddingLeft: 1, paddingRight: 3, color: 'black', alignSelf: 'normal', paddingTop: '3%' }} variant="h5">ANALYSIS</Typography>

                            </Toolbar>
                        </span>
                        <Grid container spacing={5} sx={{ paddingLeft: 3, paddingBottom: 2, paddingRight: 3, overflow: 'scroll', backgroundColor: 'transparent', maxHeight: boxMaxHeight }}>

                            {analysis.map((item, index) => (
                                <CustGrid icon={item.icon} text={item.name} />
                            ))
                            }
                        </Grid>
                    </MotionDiv>
                </I_Grid>
                <I_Grid xs={6} md={4}>
                    <MotionDiv hue={120} >

                        <span>
                            <Toolbar sx={{ justifyContent: 'center', backgroundColor: '#C3EDC0', height: 100, boxShadow: '2px 0px 4px rgba(50,50,50,0.7   )' }}  >
                                <Typography sx={{ fontFamily: 'ubuntu ', textDecoration: 'underline', paddingLeft: 1, float: 'bottom', paddingTop: '3%', color: 'black' }} variant="h5">INFORMATION ENTRY</Typography>

                            </Toolbar>
                        </span>
                        <Grid container spacing={5} sx={{ paddingLeft: 3, paddingRight: 3, paddingBottom: 2, paddingTop: 2, overflow: 'scroll', backgroundColor: 'transparent', maxHeight: boxMaxHeight }}>

                            {analysis.map((item, index) => (
                                <CustGrid text={item.name} />
                            ))
                            }
                        </Grid>
                    </MotionDiv>
                </I_Grid>

                <I_Grid xs={6} md={4}>
                    <MotionDiv hue={300} >


                        <span style={{ filter: 'drop-shadow(2px 0px 2px rgba(50,50,50,0.7   ))' }}>
                            <Toolbar className='clippathr' sx={{ justifyContent: 'right', backgroundColor: '#C3EDC0', height: 100, boxShadow: '2px 0px 4px rgba(50,50,50,0.7   )' }}  >
                                <Typography sx={{ fontFamily: 'ubuntu ', textDecoration: 'underline', margin: 0, paddingLeft: 1, paddingRight: 3, color: 'black', alignSelf: 'normal', paddingTop: '3%' }} variant="h5">ANALYSIS</Typography>

                            </Toolbar>

                        </span >
                        <Grid container spacing={5} sx={{ paddingLeft: 3, paddingRight: 3, paddingBottom: 2, overflow: 'scroll', backgroundColor: 'transparent', maxHeight: boxMaxHeight }}>

                            {analysis.map((item, index) => (
                                <CustGrid text={item.name} />
                            ))
                            }
                        </Grid>
                    </MotionDiv>
                </I_Grid>

            </IC_Grid>


        </Grid >
    )
}


export default function Home() {
    return (
        <Box className='h_background' sx={{ flexGrow: 1, minHeight: '100vh' }}>

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

