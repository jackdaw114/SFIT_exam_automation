import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BackgroundContext } from './BackgroundContext';

export const SubjectRequests = () => {
    const [data, setData] = useState();
    const { setCustomBackgroundColor } = useContext(BackgroundContext)
    useEffect(() => {
        setCustomBackgroundColor(' #F7F9F9')
        axios.post('/admin/get_unverified_teacher_subject', {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            }).then(res => {
                console.log(res.data)
                setData(res.data)
            })
    }, [])
    return (
        <div style={{ marginTop: 20 }}>
            {data ?
                data.map((item, index) => {
                    return (
                        <Accordion sx={{
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
                                    return <>
                                        <div>
                                            {detail.subject_details[0]?.subject_id} - {detail.subject_details[0]?.subject_name}
                                            &nbsp;  &nbsp;
                                            Class: {detail.class}
                                        </div>
                                    </>
                                }) : <></>}
                            </AccordionDetails>
                        </Accordion>)
                }) : <></>
            }
        </div >
    )
}
