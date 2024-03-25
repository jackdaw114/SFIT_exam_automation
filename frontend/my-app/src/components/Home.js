import { Box, Button, Card, CardActionArea, CardContent, Grid, Icon, Typography } from "@mui/material";
import './Home2.css'
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
//import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Topbar from "./Topbar";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <Box sx={{ paddingTop: 2 }} >

     
    </Box>
  )
}