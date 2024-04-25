import { Box, Typography } from "@mui/material";
import { useState } from "react";
import './TeacherHome.css'
import TeacherNav from "./SheetPortal";
import Settings from "./Settings";
import Analysis from "./Analysis";
import { TeacherNavbar } from "./TeacherNavbar";


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
                <TeacherNavbar handleItemClick={handleItemClick} list_items={list_items} />

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
