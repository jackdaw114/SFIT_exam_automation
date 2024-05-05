import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';
import { useLocation } from 'react-router';
import axiosInstance from './axiosInstance';

const IndividualRequest = ({ detail }) => {
    const currentDate = new Date(detail?.time);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const [isClicked, setIsClicked] = useState(false)
    const [result, setResult] = useState('')

    const handleAccept = async (id) => {
        try {
            const response = await axiosInstance.post('/admin/accept_teacher_subject', { _id: id });
            console.log(response.data);
            setIsClicked(true)
            setResult('Accepted')


        } catch (error) {
            console.error(error);

        }
    };

    const handleDeny = async (id) => {
        try {
            const response = await axiosInstance.post('/admin/deny_teacher_subject', { _id: id });
            console.log(response.data);
            setIsClicked(true)
            setResult('Rejected')


        } catch (error) {
            console.error(error);

        }
    };





    return (


        <div key={detail._id} className="text-base flex justify-between my-4"
        >
            <div>
                <span className="font-bold">
                    {detail.subject_details[0]?.subject_id} - {detail.subject_details[0]?.subject_name}
                </span>
                <span className="ml-2">Class: {detail.class}</span>
                <br />
                <span>Date of Request: {`${day}-${month}-${year} ${hours}:${minutes}`}</span>
            </div>
            {status === "Pending" &&

                <div className='flex items-center justify-center '>
                    {isClicked ? <><span className='font-bold text-secondary'>
                        {result}
                    </span>
                    </> : <>
                        <Button onClick={() => { handleAccept(detail._id); }} variant="contained" color="primary" className='rounded-full'>
                            <TiTick size={20} />
                        </Button>
                        <Button onClick={() => { handleDeny(detail._id); }} variant="contained" color="secondary" className='rounded-full'>
                            <RxCross2 size={20} />
                        </Button>
                    </>}
                </div>
            }

        </div>


    );

}

export default IndividualRequest