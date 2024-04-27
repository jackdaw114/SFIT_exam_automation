import React from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { MdOutlinePendingActions } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import { ImCancelCircle } from "react-icons/im";
import { Badge } from '@mui/material';

const SubscriptionRequests = () => {
    return (
        <div className=' -mt-14 w-full h-fit flex justify-center text-2xl font-mont font-medium'>
            <div className='w-11/12 flex justify-center '>
                <div className=' aspect-square grid grid-rows-2 grid-cols-2 w-7/12  gap-10'>


                    <Badge badgeContent={34} max={20} color='warning' className=' col-span-2'>
                        <div className='flex w-full justify-center border rounded bg-cyan-800'>
                            <div className='w-full  flex flex-col justify-center items-center '>

                                <MdOutlinePendingActions size={72} className="pb-8" />
                                <div>
                                    Pending
                                    Requests
                                </div>
                            </div>
                        </div>
                    </Badge>


                    <div className='flex w-full justify-center'>
                        <div className='w-full border rounded bg-secondary flex flex-col justify-center items-center'>
                            <FcAcceptDatabase size={72} className="pb-8" />
                            <div>
                                Accepted
                            </div>
                            <div>
                                Requests
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-center'>
                        <div className='w-full border rounded bg-red-700 flex flex-col justify-center items-center'>
                            <ImCancelCircle size={72} className="pb-8" />
                            <div>
                                Rejected
                            </div>
                            <div>
                                Requests
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionRequests