import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import Home from './components/Home2';
import VerifyEligibility from './components/VerifyEligibility';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'

function App() {
  return (
    <Box >

      <BrowserRouter>
      <Routes>
      <Route path='/verifyeligibility' element={<><Navbar heading="Verify Eligibility"/><VerifyEligibility /></>}></Route>
          <Route path='/' element={<><Home /></>}></Route>
      </Routes>
      </BrowserRouter>
      </Box>
  );
}

export default App;
