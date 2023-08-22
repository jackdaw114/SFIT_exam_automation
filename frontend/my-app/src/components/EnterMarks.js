import { Box } from "@mui/material"
import axios from "axios"
import Header from "./Header"
import NewSheet from "./NewSheet"
import { useEffect } from "react"




export default function EnterMarks() {
    let tabledata = []
    useEffect(() => {
        axios.get('/teacher/getmarks').then((res) => {
            console.log(res)
            tabledata = res.data
            console.log(tabledata)
        }).catch((err) => {
            console.log(err)
        })
    }, []);
    return (
        <>
            <Box className='h_background' sx={{ flexGrow: 1, minHeight: '100vh' }}>
                <Header />
                <NewSheet table={[{tabledata}]} />
            </Box>
        </>
    )
}