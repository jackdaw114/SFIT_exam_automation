import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import Home from './components/Home2';
import VerifyEligibility from './components/VerifyEligibility';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import EnterMarks from './components/EnterMarks';

function App() {
  return (
    <Box >

      <BrowserRouter>
      <Routes>
          <Route path='/verifyeligibility' element={<><VerifyEligibility /></>}></Route>
          <Route path ='/entermarks' element={<><EnterMarks/></>}></Route>
          <Route path='/' element={<><Home /></>}></Route>
      </Routes>
      </BrowserRouter>
      </Box>
  );
}

export default App;
