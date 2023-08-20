
import { Paper, Table, TableCell, TableHead, TableRow, TableBody, TableContainer, tableCellClasses} from "@mui/material"
import { styled } from '@mui/material/styles';
import './NewSheet.css';



export default function NewSheet(props) {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));


  let column = Object.keys(props.table[0])
  
  let HeadingData = () => {
    return column.map((data) => {
      return <StyledTableCell align="center">{data}</StyledTableCell>
    })
  }

  let BodyData = () => {
    return props.table.map((data) => {
      return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {
            column.map((index) => {
              return <TableCell align="center">{data[index]}</TableCell>
            })
          }
        </TableRow>
      )
    })
  }


  return (
    <>
      <div className="container">
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
