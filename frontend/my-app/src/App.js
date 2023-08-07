// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import Home from './components/Home';
import React, { useEffect } from "react";
import VerifyEligiblity from './components/VerifyEligiblity';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Topbar from './components/Topbar';

function WithoutNav() {
  return (
    <>
      <Home/>
    </>
  )
}

function WithNav() {
  return (
    <>
      <Navbar/>
      
    </>
  )
}
function App() {
  const [open, setOpen] = React.useState(false);
  const [loc,setLoc] = React.useState(window.location.pathname);
  console.log(loc === '/');

  useEffect( () => {
    setLoc(window.location.pathname);
  },[])
  return (
    <Box >
      <Topbar open={open} />
      <BrowserRouter>

        <Routes>

          <Route path='/verifyeligibility' element={<><Navbar func={ setOpen } open = {open} /><VerifyEligiblity /></>}></Route>
          <Route path='/' element={<><Home /></>}></Route>
        </Routes>

      </BrowserRouter>
    </Box>
  );
}

export default App;
