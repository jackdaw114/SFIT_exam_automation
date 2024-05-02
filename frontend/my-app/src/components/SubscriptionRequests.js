import React from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { MdOutlinePendingActions } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { ImCancelCircle } from "react-icons/im";
import { Badge } from '@mui/material';

import { useState } from 'react';
import RequestComponent from './RequestComponent';
import { HiCheck } from "react-icons/hi";
import { motion } from 'framer-motion';

const SubscriptionRequests = () => {

    const accepted_icon = <HiCheck size={72} className="pb-8 text-secondary" />;
    const rejected_icon = <ImCancelCircle size={72} className="pb-8 text-orange-950" />;
    const pending_icon = <MdOutlinePendingActions size={90} className="pb-8 opacity-60" />
    const icons_components = [accepted_icon, rejected_icon, pending_icon];

    return (
        <div className=' -mt-14 w-full h-fit flex justify-center text-2xl font-mont font-medium'>
            <div className='w-11/12 flex justify-center '>
                <div className=' aspect-square grid grid-rows-2 grid-cols-2 w-7/12  gap-10 transition-all'>
                    <Badge badgeContent={34} max={20} color='warning' className=' col-span-2 shadow-md duration-300 ease-in-out'>
                        <RequestComponent status="Pending" idx={2} icons={icons_components} bgColor="bg-[#6699CC]" />
                    </Badge>
                    <RequestComponent status="Accepted" idx={0} icons={icons_components} bgColor="bg-[#A0dbbC]" />
                    <RequestComponent status="Rejected" idx={1} icons={icons_components} bgColor="bg-[#DE6B48]" />
                </div>
            </div>
        </div>
    )
}

export default SubscriptionRequests