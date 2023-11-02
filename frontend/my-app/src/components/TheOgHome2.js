import { AppBar, Box, Divider, Grid, Hidden, Icon, Paper, Toolbar, Typography } from "@mui/material";
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
import Header from './Header';

const boxMinHeight = 200;
const boxMaxHeight = 400;


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
        <Grid item sx={6} md={3}>
            <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CustIcon style={{ height: 35, color: '#555555', padding: 8, borderRadius: 20, backgroundColor: coloors_gc[Math.floor(Math.random() * 6)] }}>
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



const MotionDiv = (props) => <motion.div {...props} whileHover={{ filter: `grayscale(0%) hue-rotate(${props.hue}deg)` }}
    style={{
        backgroundColor: 'white', overflow: 'hidden',
        boxShadow: ' 0px 0px 1px  grey', filter: `grayscale(100%) hue-rotate(${props.hue}deg)`
    }} />

MotionDiv.defaultProps = {
    hue: 0
}


function HomeGrid() {

    return (
        <Grid container spacing={5} sx={{ paddingLeft: 20, paddingTop: 5, paddingRight: 20, paddingBottom: 3 }}>

            <IC_Grid>
                <I_Grid xs={12} md={6}>


                    <MotionDiv >

                        <span style={{}}>
                            <Toolbar className="clippath" sx={{ backgroundColor: '#798799', borderTop: '10px solid #525e6c', }} >
                                <Typography sx={{ fontFamily: 'anton', margin: 0, paddingLeft: 0, paddingRight: 3, color: '#555555', alignSelf: 'normal', paddingTop: 2 }} variant="h5">ANALYSIS</Typography>

                            </Toolbar>
                        </span>
                        <Grid container spacing={5} sx={{ padding: 3, overflow: 'scroll', backgroundColor: 'transparent', maxHeight: boxMaxHeight }}>

                            {analysis.map((item, index) => (
                                <CustGrid icon={item.icon} text={item.name} />
                            ))
                            }
                        </Grid>
                    </MotionDiv>
                </I_Grid>
                <I_Grid xs={12} md={6}>
                    <MotionDiv hue={120} >

                        <span>
                            <Toolbar className="clippath" sx={{ backgroundColor: '#798799', borderTop: '10px solid #525e6c', justifyContent: 'right' }} >
                                <Typography sx={{ fontFamily: 'anton ', justifySelf: 'center', alignSelf: 'center', color: '#555555' }} variant="h5">INFORMATION ENTRY</Typography>

                            </Toolbar>

                        </span>
                        <Grid container spacing={5} sx={{ padding: 3, overflow: 'scroll', backgroundColor: 'transparent', maxHeight: boxMaxHeight }}>

                            {analysis.map((item, index) => (
                                <CustGrid text={item.name} />
                            ))
                            }
                        </Grid>
                    </MotionDiv>
                </I_Grid>

                <I_Grid xs={12} md={6}>
                    <MotionDiv hue={240} >


                        <span style={{}}>
                            <Toolbar className="clippath" sx={{ backgroundColor: '#798799', borderTop: '10px solid #525e6c', }} >
                                <Typography sx={{ fontFamily: 'anton', margin: 0, paddingLeft: 1, paddingRight: 3, color: '#555555', alignSelf: 'normal', paddingTop: 2 }} variant="h5">ANALYSIS</Typography>

                            </Toolbar>

                        </span >
                        <Grid container spacing={5} sx={{ padding: 3, overflow: 'scroll', backgroundColor: 'transparent', maxHeight: boxMaxHeight }}>

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
            <Header />
            <HomeGrid />
        </Box >
    )
}
