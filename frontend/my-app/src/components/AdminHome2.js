import { useState } from "react";
import CreateTeacher from "./CreateTeacher";
import DeleteTeacher from "./DeleteTeacher";
import Gazette from "./Gazette";
import Report from "./Report";
import UpdateTeacher from "./UpdateTeacher";
import { TeacherNavbar } from "./TeacherNavbar";

export default function AdminHome2() {
    const [currentPage, setCurrentPage] = useState(null);
    const [pageComponent, setPageComponent] = useState(null);

    const handleItemClick = (page) => {
        setCurrentPage(page);
        if (page === 'Create Teacher') {
            setPageComponent(<CreateTeacher />);
        } else if (page === 'Delete Teacher') {
            setPageComponent(<DeleteTeacher />);
        } else if (page === 'Update Teacher') {
            setPageComponent(<UpdateTeacher />);
        } else if (page === 'Generate Gazette') {
            setPageComponent(<Gazette />);
        } else if (page === 'Generate Reports') {
            setPageComponent(<Report />);
        } else {
            setPageComponent(null);
        }
    };

    const list_items = ['Create Teacher', 'Delete Teacher', 'Update Teacher', 'Generate Gazette', 'Generate Reports'];

    return (
        <>
            <div>
                <TeacherNavbar handleItemClick={handleItemClick} list_items={list_items} />

                <div className="flex min-h-screen max-h-full bg-sky-100" style={{ maxWidth: '100vw' }}>
                    <div className=" h-full" style={{ marginLeft: '20vw' }} ></div>
                    <div className="  " style={{ width: '80vw' }}>

                        <div className=" mt-20  " style={{ maxWidth: '80vw' }}>
                            {pageComponent}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
