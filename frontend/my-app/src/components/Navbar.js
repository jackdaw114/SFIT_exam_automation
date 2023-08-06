import React from "react";
import './Navbar.css'
import {styled, useTheme} from '@mui/material/styles'
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ClickAwayListener } from "@mui/material";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Topbar from "./Topbar";

const drawerWidth =240;

const openedMixin = (theme) => ({
    width:drawerWidth,
    transition: theme.transitions.create('width',{
        easing: theme.transitions.duration.sharp,
    }),
    overflowX:'hidden',
})

const closedMixin = (theme)=>({
    transition: theme.transitions.create('width',{
        easing:theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX:'hidden',
    width:`calc(${theme.spacing(7)})`,
    [theme.breakpoints.up('sm')]:{
        width:`calc(${theme.spacing(8)} + 1px)`,
    },
})


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  const CustDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',

      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
      
    }),
  );

export default function Navbar(){
    const theme = useTheme();
    const [open, setOpen] = React.useState(false)
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    return (
        <Box>
<Topbar open={open}/>

            <ClickAwayListener onClickAway={handleDrawerClose} >
        <CustDrawer PaperProps={{sx:{backgroundColor:'#f5f5f5'}}} variant="permanent"open={open} >
        <DrawerHeader>
          <IconButton  onClick={()=>{
            if(open)
            handleDrawerClose();
            else
            handleDrawerOpen();
            }}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
      
        <List>
          {['home','about' ,'academic record','analysis' ,'certificates','enter information','enter marks','gazette' , 'hall tickets', 'old syllabus', 'templates', 'transcript', 'elegibility', 'logout'
].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <CircleOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CustDrawer>
      </ClickAwayListener>
      </Box>
    )
    
}