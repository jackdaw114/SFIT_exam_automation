import { Box, Button, Card, CardActionArea, CardContent, Grid, Icon, Typography } from "@mui/material";

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

export default function Home(){
    return (
        <Box sx={{paddingTop:2}} >
          <Topbar home={true}/>
          <Grid container sx={{padding:"10px 200px" }}  columnSpacing={5} rowSpacing={5}>
          {['about' ,'academic record','analysis' ,'certificates','enter information','enter marks','gazette' , 'hall tickets', 'old syllabus', 'templates', 'transcript', 'elegibility', 'logout'
].map((text,index)=>(

  <Grid item xs={3}  >
        <Card  elevation={1}  sx={{borderRadius:5, textAlign:'center'}}>
            <CardActionArea sx={{ padding:5}}> 
           <CardContent >
<Typography variant="h5">  
              {text}
</Typography>
</CardContent>
            </CardActionArea>   
            </Card>
        
        </Grid>
))}
</Grid>
        </Box>
    )
}