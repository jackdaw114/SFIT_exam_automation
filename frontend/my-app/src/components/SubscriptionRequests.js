import React from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { MdOutlinePendingActions } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { ImCancelCircle } from "react-icons/im";
import { Badge } from '@mui/material';

import { useState } from 'react';
import RequestComponent from './RequestComponent';
import { motion } from 'framer-motion';

const SubscriptionRequests = () => {

    const [isHovered, setIsHovered] = useState(false);

    const handleHoverStart = () => {
        setIsHovered(true);
    };

    const handleHoverEnd = () => {
        setIsHovered(false);
    };

    const accepted_icon = <FcAcceptDatabase size={72} className="pb-8" />;
    const rejected_icon = <ImCancelCircle size={72} className="pb-8" />;

    const icons_components = [accepted_icon, rejected_icon];



    return (
        <div className=' -mt-14 w-full h-fit flex justify-center text-2xl font-mont font-medium'>
            <div className='w-11/12 flex justify-center '>
                <div className=' aspect-square grid grid-rows-2 grid-cols-2 w-7/12  gap-10 transition-all'>



                    <Badge badgeContent={34} max={20} color='warning' className=' col-span-2 hover:shadow-xl duration-300 ease-in-out'>
                        <div className='flex w-full h-full justify-center border rounded bg-cyan-800'>
                            <div className='w-full  flex flex-col justify-center items-center '>

                                <MdOutlinePendingActions size={72} className="pb-8" />
                                <div>
                                    Pending
                                    Requests
                                </div>
                            </div>
                        </div>
                    </Badge>


                    {/* <motion.div className='parent_div flex w-full justify-center hover:shadow-xl duration-300 ease-in-out'
                        initial={{ x: 0 }}
                        whileHover={{ x: 10 }}
                        onHoverStart={handleHoverStart}
                        onHoverEnd={handleHoverEnd}
                    >
                        <div className='w-full border rounded bg-secondary flex flex-col justify-center items-center relative'>
                            <FcAcceptDatabase size={72} className="pb-8" />
                            <div>
                                Accepted
                            </div>
                            <div>
                                Requests
                            </div>
                            <motion.div
                                className="child_div absolute bottom-0 right-0 mr-2 mb-2"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 5 }}
                            >
                                <FaArrowRight className=' text-slate-200' />
                            </motion.div>
                        </div>
                    </motion.div> */}

                    <RequestComponent status="Accepted" idx={0} icons={icons_components} bgColor="bg-secondary" />
                    <RequestComponent status="Rejected" idx={1} icons={icons_components} bgColor="bg-red-700" />


                </div>
            </div>
        </div>
    )
}

export default SubscriptionRequests