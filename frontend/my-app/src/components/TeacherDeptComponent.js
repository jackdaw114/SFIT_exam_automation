import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FcAcceptDatabase } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const TeacherDeptComponent = ({ status, idx, icons, bgColor }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleHoverStart = () => {
        setIsHovered(true);
    };

    const handleHoverEnd = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        navigate(`/adminhome/teachers/${status.toLowerCase()}?status=${status}`);
    };


    return (
        <motion.div className='parent_div flex w-full rounded-lg bg-sky-50 hover:bg-sky-100 justify-center hover:shadow-xl duration-300 ease-in-out cursor-pointer p-1'

            onClick={handleClick}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
        >
            <div className={`w-full ${bgColor}  border rounded flex flex-col justify-center items-center relative text-black`}>
                {/* <FcAcceptDatabase size={72} className="pb-8" /> */}
                {icons[idx]}
                <div>
                    {status}
                </div>

                <motion.div
                    className="child_div absolute bottom-0 right-0 mr-4 mb-1"
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 7 }}
                    transition={{ delay: 0.1 }}
                >
                    <FaArrowRight className='text-slate-200' />
                </motion.div>

            </div>
        </motion.div>
    )
}

export default TeacherDeptComponent;
