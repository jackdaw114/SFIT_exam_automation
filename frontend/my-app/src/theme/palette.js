import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // Use light mode
        primary: {
            main: '#292F36', // Your primary color
        },
        secondary: {
            main: '#497487', // A complementary color for variety
        },
        background: {
            default: '#FFFFFF', // Light background color
            paper: '#F5F5F5', // Background color for paper surfaces
        },
        text: {
            primary: '#333333', // Text color for primary content
            secondary: '#616161', // Text color for secondary content
        },
    },
});

export default theme;
