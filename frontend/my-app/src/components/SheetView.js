import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { read, utils, writeFile } from 'xlsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container, Paper, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Tooltip, Fade, Snackbar
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  CloudUpload as CloudUploadIcon,
  GetApp as DownloadIcon
} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from './axiosInstance';


const theme = createTheme({
  palette: {
    primary: { main: '#1e88e5' },
    secondary: { main: '#ff4081' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
      },
    },
  },
});

const SheetView = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [sheetData, setSheetData] = useState([]);
  let location = useLocation();
  const [maxMarks, setMaxMarks] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [valid, setValid] = useState(true)

  const handleEdit = (index, field, value) => {


    const updatedData = [...sheetData];
    let newValue = Number(value);

    if (isNaN(newValue) || value.trim() === '') {
      // Input is not a valid number or is empty
      // Handle the error condition here if needed
      console.log('weeeeee')
      return;
    }

    if (newValue > maxMarks) {
      // Value exceeds maxMarks
      // Display a notification or handle the error condition here
      setTimeout(() => {
        setSnackbar({
          open: true,
          message: `Cannot update: Some marks exceed the maximum of ${maxMarks}`,
          severity: 'error'
        });
      }, 1000);
      setValid(false)

      updatedData[index][field] = -8;
      setSheetData(updatedData);
      console.log(sheetData)
      // toast("Value cannot exceed maxMarks.");
      return;
    }
    else {
      // Update the data
      updatedData[index][field] = newValue;
      setValid(true)
      setSheetData(updatedData);
    }
  }


  const handleUpdate = () => {
    // Check if any marks exceed maxMarks
    // const exceedsMaxMarks = sheetData.some(row => row.marks > maxMarks);
    // console.log('Exceeds max marks: ', exceedsMaxMarks);
    // console.log(sheetData)

    // if (exceedsMaxMarks) {
    //   setSnackbar({
    //     open: true,
    //     message: `Cannot update: Some marks exceed the maximum of ${maxMarks}`,
    //     severity: 'error'
    //   });
    //   return; // Exit the function early
    // }

    // If we reach this point, no marks exceed maxMarks
    if (!valid) {
      return;
    }

    axiosInstance.post('/teacher/update_data', {
      updated_data: sheetData,
      subject_id: location.state.subject,
      marks_type: location.state.marks_type
    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then(res => {
      console.log('Data updated successfully:', res.data);
      setSnackbar({
        open: true,
        message: 'Data updated successfully',
        severity: 'success'
      });
    }).catch(error => {
      console.error('Error updating data:', error);
      setSnackbar({
        open: true,
        message: 'Error updating data: ' + error.message,
        severity: 'error'
      });
    });
  }


  const handleDownload = () => {
    const modifiedData = sheetData.map(({ _id, ...rest }) => rest);
    const sheet = utils.json_to_sheet(modifiedData, { header: "" });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, sheet, 'sheet1');
    writeFile(wb, 'test.xlsx');
    setSnackbar({ open: true, message: 'File downloaded successfully' });
  }
  const handleInput = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(sheet, { header: ["name", "pid", "marks"] });

    const _idArray = sheetData.map(row => row._id);
    const finalJsonData = jsonData.slice(1).map((row, index) => ({ _id: _idArray[index], ...row }));

    axiosInstance.post('/teacher/update_data', {
      updated_data: finalJsonData,
      subject_id: location.state.subject,
      marks_type: location.state.marks_type,
    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then(res => {
      console.log('Excel Data updated successfully:', res.data);
      setSnackbar({ open: true, message: 'File uploaded and data updated successfully' });
      // Re-fetch the data to update the page
      fetchData();
    }).catch(error => {
      console.error('Error updating data:', error);
      setSnackbar({ open: true, message: 'Error uploading file' });
    });
  };
  useEffect(() => {
    console.log("Current State= ", location.state)


    switch (location.state.marks_type) {
      case 'term':
        setMaxMarks(50)
        break;
      case 'practical':
        setMaxMarks(20)
        break;
      case 'oral':
        setMaxMarks(5)
        break;
      case 'iat':
        setMaxMarks(20)
        break;
      case 'ese':
        setMaxMarks(80)
        break;
      default:
        break;
    }
    const data = {
      subject_name: location.state.subject_name,
      subject_id: location.state.subject,
      marks_type: location.state.marks_type,
      semester: location.state.semester, // TODO: change this to teacher backend when complete
      class_name: location.state.class
    }
    console.log("Current Data=", data)

    axiosInstance.post('/teacher/getdata', data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then(res => {
      console.log(res.data)
      setSheetData(res.data);
    });
  }, []);

  const fetchData = () => {
    const data = {
      subject_name: location.state.subject_name,
      subject_id: location.state.subject,
      marks_type: location.state.marks_type,
      semester: location.state.semester,
      class_name: location.state.class
    };

    axiosInstance.post('/teacher/getdata', data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then(res => {
      console.log(res.data);
      setSheetData(res.data);
    });
  };

  const handleRestrict = (e) => {
    console.log(e.target.textContent)

    if (isNaN(Number(e.target.textContent)) || e.target.textContent == '-') {
      toast("Value should be numeric.");
    }
  }


  const getRowColor = (marks) => {
    if (marks < 0) return 'bg-orange-50';
    if (marks >= 0 && marks <= (maxMarks * 0.35)) return 'bg-red-50';
    if (marks === maxMarks) return 'bg-green-50';
    return '';
  };


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" className="py-12">
        <Paper elevation={4} className="p-8 rounded-3xl shadow-xl">
          <Typography variant="h5" className="text-center mb-8 text-gray-800 font-semibold">
            {location.state.subject}: {location.state.subject_name} - <u>
              {location.state.marks_type[0].toUpperCase() + location.state.marks_type.slice(1)} Work
            </u>
          </Typography>

          <TableContainer component={Paper} elevation={2} className="mb-8 rounded-2xl overflow-hidden">
            <Table aria-label="student marks table">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold text-lg">PID</TableCell>
                  <TableCell className="font-bold text-lg">Student Name</TableCell>
                  <TableCell align="right" className="font-bold text-lg">Marks ({maxMarks})</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sheetData.map((row, index) => (
                  <TableRow
                    key={row.pid}
                    className={`${getRowColor(row.marks)} transition-colors duration-200 ease-in-out hover:bg-blue-50`}
                  >
                    <TableCell component="th" scope="row" className="font-semibold">{row.pid}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">
                      <span
                        contentEditable={isEdit}
                        onBlur={(e) => handleEdit(index, 'marks', e.target.textContent)}
                        onInput={handleRestrict}
                        className={`p-2 rounded-sm ${isEdit ? 'bg-blue-100 outline-none' : ''}`}
                        suppressContentEditableWarning={true}
                      >
                        {row.marks}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="flex justify-center space-x-6">
            <Tooltip title="Update" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                startIcon={<RefreshIcon />}
                className="shadow-md hover:shadow-lg transition-all duration-300 px-6 py-3 text-base"
              >
                Update
              </Button>
            </Tooltip>

            <Tooltip title={isEdit ? "Cancel Edit" : "Edit"} TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
              <Button
                variant="contained"
                color={isEdit ? "secondary" : "primary"}
                onClick={() => {
                  setIsEdit(!isEdit);
                  setSnackbar({ open: true, message: isEdit ? 'Edit mode disabled' : 'Edit mode enabled' });
                }}
                startIcon={isEdit ? <CancelIcon /> : <EditIcon />}
                className="shadow-md hover:shadow-lg transition-all duration-300 px-6 py-3 text-base"
              >
                {isEdit ? "Cancel" : "Edit"}
              </Button>
            </Tooltip>



            <Tooltip title="Upload File" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                className="bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-300 px-6 py-3 text-base"
              >
                Upload
                <input type="file" hidden onChange={handleInput} />
              </Button>
            </Tooltip>

            <Tooltip title="Download File" TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
              <Button
                variant="contained"
                onClick={handleDownload}
                startIcon={<DownloadIcon />}
                className="bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all duration-300 px-6 py-3 text-base"
              >
                Download
              </Button>
            </Tooltip>

          </div>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />

        <ToastContainer position="bottom-right" autoClose={3000} />
      </Container>
    </ThemeProvider>
  );
};

export default SheetView;
