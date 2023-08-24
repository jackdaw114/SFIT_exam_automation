import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import Home from './components/Home2';
import VerifyEligibility from './components/VerifyEligibility';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import EnterMarks from './components/EnterMarks';
import Auth from './components/Auth';
import Test from './components/Excel'

function App() {
  return (
    <Box >

      <BrowserRouter>
        <Routes>
          <Route path='/verifyeligibility' element={<><VerifyEligibility /></>}></Route>

          <Route path='/login' element={<><Auth /></>}></Route>
          <Route path='/entermarks' element={<><EnterMarks /></>}></Route>

          <Route path='/test' element={<><Test /></>}></Route>
          <Route path='/' element={<><Home /></>}></Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
