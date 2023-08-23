
import { Paper, Table, TableCell, TableHead, TableRow, TableBody, TableContainer, tableCellClasses, Input, Button, Box } from "@mui/material"
import { styled } from '@mui/material/styles';
import './NewSheet.css';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';


const postFunc = (inputs) => {

  axios.post('/teacher/updatemarks', inputs, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }).then(res => {
    alert('updated')
  })
}


export default function NewSheet(props) {
  const [isEdit, setIsEdit] = useState(true)
  const [updatedRows, setUpdatedRows] = useState([])
  const handleCellEdit = (rowIndex, columnIndex, newValue) => {
    // Update the table data when a cell is edited
    console.log(newValue)
    const updatedTableData = [...props.tableData];
    updatedTableData[rowIndex][columnIndex] = !isNaN(parseInt(newValue)) ? parseInt(newValue) : '';
    setUpdatedRows(updatedRows => [...updatedRows, rowIndex])
    props.func(updatedTableData);
  };


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#292F36",
      color: theme.palette.common.white,
    },
  }));


  let column = Object.keys(props.tableData[0])

  let HeadingData = () => {
    return column.map((data) => {
      const caps_data = data.charAt(0).toUpperCase() + data.slice(1);
      return <StyledTableCell align="center">{caps_data}</StyledTableCell>
    })
  }

  let BodyData = () => {
    return props.tableData.map((row, rowIndex) => {
      return (
        <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {

            column.map((col, colIndex) => {
              return <TableCell key={colIndex} align="center">

                {isEdit ? <Box><Input value={row[col]}
                  onChange={(e) =>
                    handleCellEdit(rowIndex, col, e.target.value)
                  }
                /></Box> : <Box>{row[col]}</Box>
                }
              </TableCell>
            })
          }
        </TableRow>
      )
    })
  }
  const handleSubmit = (e) => {
    const rowSet = new Set(updatedRows)
    console.log(rowSet)
    for (const key of rowSet) {
      console.log(key)
      postFunc(props.tableData[key])
      setUpdatedRows([])
    }
  }
  return (
    <>
      <div className="container">
        <Box>

          <Button color="success" sx={{ margin: '30px 5px' }} variant="contained" onClick={() => handleSubmit()} >
            Save changes
          </Button>
          <Button color="info" sx={{ margin: '30px 5px' }} variant="contained" endIcon={isEdit ? <CancelIcon /> : <EditIcon />} onClick={() => { setIsEdit(!isEdit) }}>
            {isEdit ? "Cancel" : "Edit"}
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead align="center">
              <TableRow>
                {HeadingData()}
              </TableRow>
            </TableHead>
            <TableBody>
              {BodyData()}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}
