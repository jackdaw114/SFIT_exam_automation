import { Box, CircularProgress, Typography, keyframes } from '@mui/material';
import img from '../imgtest/favicon.ico';

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingScreen = () => (
    <Box
        display="flex"
        justifyContent="center"
        paddingTop={20}
        height="100vh"
        bgcolor="#f5f5f5"
    >
        <Box textAlign="center">
            <div className='flex justify-center '>

                <img
                    src={img}
                    alt="Company Logo"
                    style={{
                        width: 230,
                        marginBottom: 20,
                    }}
                />
            </div>
            <CircularProgress
                size={30}
                thickness={8}
                className='text-secondary'
                sx={{

                    animation: `${pulse} 1.5s ease-in-out infinite`,
                    animationDelay: '0.5s',
                }}
            />
            <Typography
                variant="h6"
                sx={{
                    marginTop: 3,
                    fontWeight: 'medium',
                    color: 'text.secondary',
                    animation: `${pulse} 1.5s ease-in-out infinite`,
                    animationDelay: '1s',
                }}
            >
                Loading your exams...
            </Typography>
        </Box>
    </Box>
);

export default LoadingScreen;