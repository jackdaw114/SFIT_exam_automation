import React, { useEffect } from "react";
import { AppBar, Box, Button, Divider, Icon, IconButton, Paper, Toolbar, Typography, createTheme } from "@mui/material";
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import { styled, useTheme } from '@mui/material/styles'
import zIndex from "@mui/material/styles/zIndex";
import img from '../imgtest/favicon.ico';
const drawerWidth = 240;


export default function Topbar(props) {
  const [loc, setLoc] = React.useState(window.location.pathname);
  console.log(loc === '/');
  
  useEffect(() => {
    setLoc(window.location.pathname);
  }, [])
  
  const openedMixin = (theme) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.duration.sharp,
    }),
  })
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  
    width: `calc(100% -${loc=== '/' ? 0 : theme.spacing(7)})`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${loc === '/' ? 0 : theme.spacing(8)} + 1px)`,
    },
  })
  
  const CustAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    backgroundColor: "#f5f6f7",
    position: "fixed",
    color: 'black',
    ...(open && {
      ...openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
    })
  
  }))
  const theme = useTheme();
  console.log(props.open)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustAppBar elevation={0} sx={{ borderBottom: 1, borderColor: 'grey.300', height: 'auto' }} open={props.open} position="fixed"
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box className='topbox' sx={{ justifyContent: "center", display: 'flex', alignItems: "center" }}>
            <Box>
              <img src={img} alt="sfit" style={{ height: '60px' }}></img>
            </Box>
            <Box sx={{ flexGrow: 1, fontSize: '60px', paddingBottom: 0.5, marginLeft: '10px', marginRight: '40px' }}>
              Home
            </Box>
          </Box>
        </Toolbar>
      </CustAppBar>

      <Toolbar />
      <br />
    </Box>
  )
}