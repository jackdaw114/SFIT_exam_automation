import { Box, Typography } from "@mui/material";
import { useState } from "react";
import './TeacherHome.css'
import TeacherNav from "./SheetPortal";
import Settings from "./Settings";


export default function TeacherHome() {
    const [currentPage, setCurrentPage] = useState(null);
    const [pageComponent, setPageComponent] = useState(null);

    const handleItemClick = (page) => {
        setCurrentPage(page);
        if (page === 'Grading & Assessments') {
            setPageComponent(<TeacherNav />);
        } else if (page === 'Settings') {
            setPageComponent(<Settings />);
        } else {
            setPageComponent(null);
        }
    };

    const list_items = ['Grading & Assessments', 'Settings'];

    return (
        <>


            <div className="fixed h-full bg- flex flex-col bg-zinc-800 items-center  w-1/5 font-['ubuntu'] ">
                <Box className=" flex w-4/5 bg-inherit py-5  justify-center items-center" sx={{ borderBottom: 3, borderBottomColor: '#136F63' }} >
                    <Typography className=" font-['ubuntu'] text-white/90 " variant="h4">Navigation</Typography>
                </Box>
                <div className="w-full h-full bg-inherit text-white/90 py-6">
                    {list_items.map((item) => (
                        <div key={item} onClick={() => handleItemClick(item)} className="cursor-pointer hover:text-secondary transition-all duration-200 py-5 px-5 text-center">{item}</div>
                    ))}
                </div>
            </div>

            <div className="flex h-full w-full">
                <div className="w-1/5 h-full"></div>
                <div className="render_pages h-full bg-slate-200 w-4/5  ">

                    <div className="  ">
                        {pageComponent}
                    </div>
                </div>
            </div>


        </>
    )
}
