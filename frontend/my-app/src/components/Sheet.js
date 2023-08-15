import { Paper, Table, TableCell, TableHead, TableRow, TableBody, TableContainer,tableCellClasses } from "@mui/material"
import { styled } from '@mui/material/styles';
import './Sheet.css'

const test = [ "Calories", "Fat", "Carbs", "Protein"];
const rows = [
    {
        name: 'row1',
        test: 100,
        calories: 100,
        fat: 100,
        carbs: 100,
        protein: 100,
    },
    {
        name: 'row1',
        test: 100,
        calories: 100,
        fat: 100,
        carbs: 100,
        protein: 100,
    },
    {
        name: 'row1',
        test: 100,
        calories: 100,
        fat: 100,
        carbs: 100,
        protein: 100,
    },
    {
        name: 'row1',
        test: 100,
        calories: 100,
        fat: 100,
        carbs: 100,
        protein: 100,
    },
    {
        name: 'row1',
        test: 100,
        calories: 100,
        fat: 100,
        carbs: 100,
        protein: 100,
    },
    {
        name: 'row1',
        test: 100,
        calories: 100,
        fat: 100,
        carbs: 100,
        protein: 100,
    },
    {
        name: 'row1',
        test: 100,
        calories: 100,
        fat: 100,
        carbs: 100,
        protein: 100,
    },
    {
        name: 'row1',
        test: 100,
        calories: 100,
        fat: 100,
        carbs: 100,
        protein: 100,
    },
    {
        name: 'row1',
        test: 100,
        calories: 100,
        fat: 100,
        carbs: 100,
        protein: 100,
    },
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    
  }));


export default function Sheet(props) {
    return (
        <>
            <div className="container">

                <TableContainer component={Paper} sx={{color: 'red'}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    test.map((item) => {
                                        return (
                                            <StyledTableCell align="center">{item}</StyledTableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row) => {
                                    return(
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/* <TableCell align='right' component="th" scope="row">
                                            {row.name}
                                        </TableCell> */}
                                        <TableCell align="center">{row.calories}</TableCell>
                                        <TableCell align="center">{row.fat}</TableCell>
                                        <TableCell align="center">{row.carbs}</TableCell>
                                        <TableCell align="center">{row.protein}</TableCell>
                                    </TableRow>
         
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </>
    )
}