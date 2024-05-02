import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FcAcceptDatabase } from 'react-icons/fc';

const RequestComponent = ({ status, idx, icons, bgColor }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHoverStart = () => {
        setIsHovered(true);
    };

    const handleHoverEnd = () => {
        setIsHovered(false);
    };
    return (
        <motion.div className='parent_div flex w-full justify-center hover:shadow-xl duration-300 ease-in-out cursor-pointer'
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
        >
            <div className={`w-full ${bgColor} border rounded flex flex-col justify-center items-center relative`}>
                {/* <FcAcceptDatabase size={72} className="pb-8" /> */}
                {icons[idx]}
                <div>
                    {status}
                </div>
                <div>
                    Requests
                </div>
                <motion.div
                    className="child_div absolute bottom-0 right-0 mr-2 mb-2"
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 7 }}
                    transition={{ delay: 0.5 }}
                >
                    <FaArrowRight className='text-slate-200' />
                </motion.div>

            </div>
        </motion.div>
    )
}

export default RequestComponent