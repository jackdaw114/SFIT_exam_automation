import React from "react";
import { AppBar, Box, Button, Divider, Icon, IconButton, Paper, Toolbar, Typography, createTheme } from "@mui/material";
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import { styled, useTheme } from '@mui/material/styles'
import zIndex from "@mui/material/styles/zIndex";
import img from '../imgtest/favicon.ico'
const drawerWidth = 240;

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

  width: `calc(100% -${theme.spacing(7)})`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(100% - ${theme.spacing(8)} + 1px)`,
  },
})

const CustAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => !['home', 'open'].includes(prop)
})(({ theme, open, home }) => ({
  backgroundColor: "#f5f6f7",
  position: "fixed",
  color: 'black',
  ...((open && !home) && {
    ...openedMixin(theme),
  }),
  ...((!open && !home) && {
    ...closedMixin(theme),
  })

}))

export default function Topbar(props) {
  const theme = useTheme();
  console.log(props.open)
  return (
    <Box>
      <Toolbar  >
        <CustAppBar open={props.open} sx={{ backgroundColor: '#292F36', justifyContent: 'center', alignItems: 'center', borderBottom: '20px solid #136F63' }} elevation={0}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
            <img src={img} style={{ height: 100 }} />
            <Typography variant="h3" sx={{
              textShadow: '1px 1px 1px rgba(255,255,255,0.9)', color: 'transparent', backgroundClip: 'text',
              backgroundColor: '#333333', fontFamily: 'Anton', padding: 1
            }}>
              St. Francis Institute of Technology
            </Typography>
          </Box>
        </CustAppBar>
      </Toolbar>
    </Box>
  )
}
