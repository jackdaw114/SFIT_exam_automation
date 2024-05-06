import './App.css';
import { Box, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Auth from './components/Auth';
import TeacherNav from './components/SheetPortal';
import ViewExam from './components/SheetView';
import TeacherProfile from './components/TeacherProfile';
import Gazette from './components/Gazette';
import Settings from './components/Settings';
import Header from './components/Header';
import theme from './theme/palette';
import Report from './components/Report';
import Analysis from './components/Analysis';
import Background from './components/Background';
import { BackgroundProvider } from './components/BackgroundContext';
import { TeacherNavbar } from './components/TeacherNavbar';
import CreateTeacher from './components/CreateTeacher';
import DeleteTeacher from './components/DeleteTeacher';
import UpdateTeacher from './components/UpdateTeacher';
import SubscriptionRequests from './components/SubscriptionRequests';
import { SubjectRequests } from './components/SubjectRequests';
import { SubjectListEndpoint } from './components/SubjectListEndpoint';
import ViewTeachers from './components/ViewTeachers';
import TeacherList from './components/TeacherList';



const Separator = () => <div className='mt-24'></div>
// TODO: Verify if someone is logged in if so redirect to correct page or login page

function App() {

  const teacher_list_items = [
    ['Grading & Assessments', ""], ['Settings', "settings"], ['Analysis', "analysis"]
  ];

  const admin_list_items = [
    ['Create Teacher', "create_teacher"],
    ['Delete Teacher', "delete_teacher"],
    ['Generate Gazette', "creategazette"],
    ['Generate Reports', "report"],
    ['Teacher List', "teachers"],
    ['Manage Subjects', "subject_management"]
  ];

  const button_list = ["Notifications"];

  return (
    <ThemeProvider theme={theme}>
      <BackgroundProvider>
        <Background>
          <BrowserRouter>
            <Header />
            <Separator />
            <Routes>
              <Route path='/'>
                <Route index element={<><Auth /></>}></Route>
                <Route path='home' element={<TeacherNavbar list_items={teacher_list_items} />}>
                  <Route path=''>
                    <Route index element={<TeacherNav />} />
                    <Route path='viewexam' element={<><ViewExam /></>} />
                  </Route>
                  {/* <Route path='analysis' element={<><SubjectRequests /></>} /> */}
                  <Route path='analysis' element={<><Analysis /></>} />
                  <Route path='settings' element={<><Settings /></>} />
                </Route>
                <Route path='profile' element={<><TeacherProfile /></>} />

                {/* admin routes */}

                <Route path='adminhome' element={<><TeacherNavbar list_items={admin_list_items} type="Admin" buttons={button_list} /></>} >
                  <Route path='create_teacher' element={<CreateTeacher />} />
                  <Route path='delete_teacher' element={<DeleteTeacher />} />
                  <Route path='creategazette' element={<><Gazette /></>} />
                  <Route path='report' element={<><Report /></>} />
                  <Route path='subject_management' element={<><SubjectListEndpoint /></>} />
                  <Route path='teachers' element={<><TeacherList /></>} />
                  <Route path='notifications' >
                    <Route index element={<SubscriptionRequests />} />
                    <Route path='pending_requests' element={<SubjectRequests />} />
                    <Route path='accepted_requests' element={<SubjectRequests />} />
                    <Route path='rejected_requests' element={<SubjectRequests />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>

        </Background>
      </BackgroundProvider>
    </ThemeProvider>
  );
}

export default App;
