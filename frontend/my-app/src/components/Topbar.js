import React from "react";
import { AppBar, Box, Button, Divider, Icon, IconButton, Paper, Toolbar, Typography, createTheme } from "@mui/material";
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import {styled, useTheme} from '@mui/material/styles'
import zIndex from "@mui/material/styles/zIndex";
import img from '../imgtest/favicon.ico'
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width:`calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create('width',{
        easing: theme.transitions.duration.sharp,
    }),
})

const closedMixin = (theme)=>({
    transition: theme.transitions.create('width',{
        easing:theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

    width:`calc(100% -${theme.spacing(7)})`,
    [theme.breakpoints.up('sm')]:{
        width:`calc(100% - ${theme.spacing(8)} + 1px)`,
    },
})

const CustAppBar = styled(AppBar,{
    shouldForwardProp: (prop) =>     !['home','open'].includes(prop)})(({theme,open,home})=>({
        backgroundColor:"#f5f6f7",
        position:"fixed",
        color:'black',
        ...((open && !home)&& {
            ...openedMixin(theme),
            }),
            ...((!open && !home)&& {
                ...closedMixin(theme),
                })

    }))

export default function Topbar(props){
    const theme = useTheme();
    console.log(props.open)
    return(
        <Box sx={{ flexGrow: 1 }}>
        <CustAppBar home={props.home} elevation={0} sx={{borderBottom:1, borderColor:'grey.300', height:'auto'}} open={props.open} position="fixed"
          >
          <Toolbar sx={{justifyContent:'center' }}>
              <Box className='topbox' sx={{justifyContent:"center",display:'flex',alignItems:"center"}}>
            <Box>
              <img src={img} alt="sfit" style={{height:'60px'}}></img>
            </Box>
            <Box sx={{ flexGrow: 1,fontSize:'60px',paddingBottom:0.5 }}>
              {props.heading}
            </Box>
            </Box>
          </Toolbar>
        </CustAppBar>

        <Toolbar />
        <br />
      </Box>
    )
}

Topbar.defaultProps ={
  home:false,
  heading:'not defined',
  open: false,
}