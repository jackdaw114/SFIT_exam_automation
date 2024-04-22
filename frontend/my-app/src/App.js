import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import Home from './components/TeacherHome';
import VerifyEligibility from './components/VerifyEligibility';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import EnterMarks from './components/EnterMarks';
import Auth from './components/Auth';
import Test from './components/Excel'
import TeacherNav from './components/SheetPortal';
import ViewExam from './components/SheetView';
import TeacherHome from './components/TeacherHome';
import AdminHome from './components/AdminHome';
import TheOgHome2 from './components/TheOgHome2'
import TeacherProfile from './components/TeacherProfile';
import Gazette from './components/Gazette';
import Settings from './components/Settings';
import Header from './components/Header';
import theme from './theme/palette';
import Report from './components/Report';

const teacher = '/teacher'
const admin = '/admin'

const Separator = <div className='mt-24'></div>
// TODO: Verify if someone is logged in if so redirect to correct page or login page
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <BrowserRouter>
          <Header />
          {Separator}
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
            <Route path='/report' element={<><Report /></>} />
            {/* <Route path='/analysis' element={<><Analysis /></>} /> */}
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
