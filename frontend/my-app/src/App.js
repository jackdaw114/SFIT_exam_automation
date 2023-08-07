import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import Home from './components/Home';

function App() {
  return (
    <Box >
        <Navbar />
        <Home />
      </Box>
  );
}

export default App;
