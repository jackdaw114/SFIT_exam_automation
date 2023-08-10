// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import Home from './components/Home2';
import VerifyEligibility from './components/VerifyEligibility';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'

function App() {
  const [open, setOpen] = React.useState(false);
  const [loc,setLoc] = React.useState(window.location.pathname);
  console.log(loc === '/');

  useEffect( () => {
    setLoc(window.location.pathname);
  },[])
  return (
    <Box >
        <Navbar />
        <Home />
      </Box>
  );
}

export default App;
