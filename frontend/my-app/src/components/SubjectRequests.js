import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BackgroundContext } from './BackgroundContext';
import { useLocation } from 'react-router';
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import IndividualRequest from './IndividualRequest';

export const SubjectRequests = () => {
    const [data, setData] = useState();
    const { setCustomBackgroundColor } = useContext(BackgroundContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');


    let postUrl = '';

    switch (status) {
        case 'Pending':
            postUrl = '/admin/get_unverified_teacher_subject';
            break;
        case 'Accepted':
            postUrl = '/admin/get_accepted_teacher_subject';
            break;
        case 'Rejected':
            postUrl = '/admin/get_rejected_teacher_subject';
            break;
        default:
        // Default case, handle if needed
    }

    useEffect(() => {
        setCustomBackgroundColor('#e7f1ef');

        axios.post(postUrl, {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            }).then(res => {
                console.log(res.data);
                setData(res.data);
            });
    }, [status]);

    const handleAccept = async (id) => {
        try {
            const response = await axios.post('/admin/accept_teacher_subject', { _id: id });
            console.log(response.data);



        } catch (error) {
            console.error(error);

        }
    };

    const handleDeny = async (id) => {
        try {
            const response = await axios.post('/admin/deny_teacher_subject', { _id: id });
            console.log(response.data);



        } catch (error) {
            console.error(error);

        }
    };

    return (
        <div style={{ marginTop: 20 }}>
            <h1 className='text-5xl text-center font-mont text-secondary'>{status} Requests</h1>
            {data ?
                data.map((item, index) => {
                    return (
                        <Accordion key={index} sx={{
                            marginLeft: 2,
                            marginRight: 2,
                            backgroundColor: '#D3D4D9',
                            '&.Mui-expanded': {
                                marginRight: 2,
                                marginLeft: 2,
                            },
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{}} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                // className='bg-zinc-800'
                                sx={{ fontSize: '1.5rem', backgroundColor: '#a3a4a9', color: '#444444', fontFamily: 'Ubuntu', borderBottom: 4, borderColor: '#136F63', }}
                            >
                                {item._id}
                            </AccordionSummary>
                            <AccordionDetails >
                                {item.details ? item.details.map(detail => {
                                    return (
                                        <IndividualRequest detail={detail} />
                                    )
                                }) : <></>}
                            </AccordionDetails>
                        </Accordion>
                    );
                }) : <></>}
        </div >
    );
};

export default SubjectRequests;
