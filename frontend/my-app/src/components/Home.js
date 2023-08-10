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
  
const buttons = [
  { name: 'About', nav: 'navigateAbout()' },
  { name: 'Academic Records', nav: '' },
  { name: 'Analysis', nav: '' },
  { name: 'Certificates', nav: '' },
  { name: 'Enter Information', nav: '' },
  { name: 'Enter Marks', nav: '' },
  { name: 'Gazette', nav: '' },
  { name: 'Hall Tickets', nav: '' },
  { name: 'Old Syllabus', nav: '' },
  { name: 'Templates', nav: '' },
  { name: 'Transcript', nav: '' },
  { name: 'Verify Eligibility', nav: 'navigateEligibility()' },
  { name: 'Logout', nav: '' },
];


export default function Home() {
  // const dummy = 'verifyeligibility'
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate();
  const navigateEligibility = () => {
    navigate('/verifyeligibility');
  };
  return (
    <>
        <Box sx={{paddingTop:2}} >
          <Topbar home={true} heading='Home'/>
          <Grid container sx={{padding:"10px 200px" }}  columnSpacing={5} rowSpacing={5}>
            {buttons.map((text,index)=>(
              
              <Grid item xs={3}>
                <Card  elevation={1}  sx={{borderRadius:5, textAlign:'center'}}>
                  <CardActionArea sx={{ padding: 5 }} onClick={() => {
                    try {
                      eval(text.nav);
                    }
                    catch (err) {
                      console.log(err)
                    }
                  }}> 
                    <CardContent >
                      <Typography variant="h5">  
                        {text.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>   
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
            </>
      )
    }