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
import TeacherNav from './components/TeacherNav';
import ViewExam from './components/ViewExam';
import TeacherHome from './components/TeacherHome';
import AdminHome from './components/AdminHome';
import TheOgHome2 from './components/TheOgHome2'
import TeacherProfile from './components/TeacherProfile';
import Gazette from './components/Gazette';
import Settings from './components/Settings';
import Header from './components/Header';
import theme from './theme/palette';

const teacher = '/teacher'
const admin = '/admin'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/verifyeligibility' element={<><VerifyEligibility /></>}></Route>
            <Route path='/login' element={<><Auth /></>}></Route>
            <Route path='/entermarks' element={<><EnterMarks /></>}></Route>
            <Route path='/viewexam' element={<><ViewExam /></>}></Route>
            <Route path='/test' element={<><Test /></>}></Route>
            <Route path='/' element={<><Home /></>}></Route>
            <Route path='/exam' element={<><TeacherNav /></>} />
            <Route path='/settings' element={<><Settings /></>} />
            <Route path='/viewexam' element={<><ViewExam /></>} />
            <Route path='/theog' element={<><TheOgHome2></TheOgHome2></>} />
            <Route path='/adminhome' element={<><AdminHome /></>} />
            <Route path='/profile' element={<><TeacherProfile /></>} />
            <Route path='/creategazette' element={<><Gazette /></>} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
