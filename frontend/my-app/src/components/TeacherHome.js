import { Box, Typography } from "@mui/material";
import { useState } from "react";
import './TeacherHome.css'
import TeacherNav from "./SheetPortal";
import Settings from "./Settings";
import Analysis from "./Analysis";


export default function TeacherHome() {
    const [currentPage, setCurrentPage] = useState(null);
    const [pageComponent, setPageComponent] = useState(null);

    const handleItemClick = (page) => {
        setCurrentPage(page);
        if (page === 'Grading & Assessments') {
            setPageComponent(<TeacherNav />);
        } else if (page === 'Settings') {
            setPageComponent(<Settings />);
        } else if (page === 'Analysis') {
            setPageComponent(<Analysis />);
        } else {
            setPageComponent(null);
        }
    };

    const list_items = ['Grading & Assessments', 'Settings', 'Analysis'];

    return (
        <>
            <div>


                <div className="fixed h-full  flex flex-col bg-zinc-800 items-center  w-1/5 font-['ubuntu'] " >
                    <Box className=" flex w-4/5 bg-inherit py-5  justify-center items-center" sx={{ borderBottom: 3, borderBottomColor: '#136F63' }} >
                        <Typography className=" font-['ubuntu'] text-white/90 " variant="h4">Navigation</Typography>
                    </Box>
                    <div className="h-full bg-inherit text-white/90 py-6">
                        {list_items.map((item) => (
                            <div key={item} onClick={() => handleItemClick(item)} className="cursor-pointer hover:text-secondary transition-all duration-200 py-5 px-5 text-center">{item}</div>
                        ))}
                    </div>
                </div>

                <div className="flex h-full " style={{ maxWidth: '100vw' }}>
                    <div className=" h-full" style={{ marginLeft: '20vw' }} ></div>
                    <div className="  " style={{ width: '80vw' }}>

                        <div className="  " style={{ maxWidth: '80vw' }}>
                            {pageComponent}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
