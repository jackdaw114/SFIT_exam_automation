import { Box, Grid,Icon,Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { styled } from '@mui/material/styles';
import Topbar from "./Topbar";

const boxHeight = 200;

const ItemStyle = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    
    color: theme.palette.text.secondary,
    minHeight:boxHeight,
    borderRadius:10,
    backgroundColor:'#F1F1F1',
    //border:'1px solid black',
    boxShadow: ' 0px 0px 3px  grey'
  }));

const Item =(props)=><ItemStyle {...props} elevation={0} />
const IC_Grid = (props) =><Grid {...props}  container item spacing={5} />
const I_Grid=(props) => <Grid {...props} item/>


function HomeGrid(){
    return(
        <Grid container spacing={5}  sx={{paddingLeft:20,paddingTop:2, paddingRight:20}}>
         
        <IC_Grid>
            <I_Grid xs={6}>
                <Item>
                    <Box sx={{marginTop:0,display:'flex', flexWrap:'wrap'}}>
                            <Box sx={{width:'100%', boxShadow:'0px 2px 4px -2px grey', overflow:'hidden'}}><Typography sx={{paddingTop:0.5,paddingLeft:1}}>test</Typography>
                            </Box>
                            <Box sx={{display:"flex", flexWrap:'wrap', paddingTop:2}}>
                            <Box sx={{display:'flex', justifyContent:'center',alignItems:'center',marginLeft:2}}>
                            <AddBoxOutlinedIcon style={{color:'black' , padding:5, borderRadius:9, backgroundColor:'#17BEBB' , boxShadow:'1px 1px 1px gray'}}/>
                            <Typography sx={{paddingLeft:1}}>test</Typography>
                            </Box>
                            
                            <Box sx={{display:'flex', justifyContent:'center',alignItems:'center',marginLeft:2}}>
                            <AddBoxOutlinedIcon style={{color:'black' , padding:5, borderRadius:9, backgroundColor:'#FAF0CA',boxShadow:'1px 1px 1px gray'}}/>
                            <Typography sx={{paddingLeft:1}}>test</Typography>
                            </Box>
                            <Box sx={{display:'flex', justifyContent:'center',alignItems:'center',marginLeft:2,}}>
                            <AddBoxOutlinedIcon style={{color:'black' , padding:5, borderRadius:9, backgroundColor:'#F4D35E',boxShadow:'1px 1px 1px gray'}}/>
                            <Typography sx={{paddingLeft:1}}>test</Typography>
                            </Box>
                            <Box sx={{display:'flex', justifyContent:'center',alignItems:'center',marginLeft:2,}}>
                            <AddBoxOutlinedIcon style={{color:'black' , padding:5, borderRadius:9, backgroundColor:'#F95738',boxShadow:'1px 1px 1px gray'}}/>
                            <Typography sx={{paddingLeft:1}}>test</Typography>
                            </Box>
                            </Box>
                    </Box>                
                </Item>
            </I_Grid>
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
        <Box sx={{ flexGrow: 1}}>
     <Topbar home heading='' />
        <HomeGrid />
      </Box>
    )
}

