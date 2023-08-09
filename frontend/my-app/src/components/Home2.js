import { Box, Grid,Paper } from "@mui/material";
import React from "react";

import { styled } from '@mui/material/styles';

const boxHeight = 200;

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight:boxHeight,
  }));

const IC_Grid = (props) =><Grid {...props}  container item spacing={3} />
const I_Grid=(props) => <Grid {...props} item/>


function HomeGrid(){
    return(
        <Grid container spacing={2}  sx={{padding:5}}>
         
        <IC_Grid>
            <I_Grid xs={6}><Item>test</Item></I_Grid>
            <I_Grid xs={6}><Item>test</Item></I_Grid>
 
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


export default function Home (){
    return(
        <Box sx={{ flexGrow: 1 }}>
            
        <HomeGrid />
      </Box>
    )
}

