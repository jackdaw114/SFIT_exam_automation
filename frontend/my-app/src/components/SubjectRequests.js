import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const SubjectRequests = () => {
    const [data, setData] = useState();
    useEffect(() => {
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
        <div>
            {data ?
                data.map((item, index) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                {item._id}
                            </AccordionSummary>
                            <AccordionDetails >
                                {item.details ? item.details.map(detail => {
                                    return <>
                                        <div>{detail.subject_details[0]?.subject_id} | {detail.subject_details[0]?.subject_name}
                                            <br />Class: {detail.class}
                                        </div>
                                    </>
                                }) : <></>}
                            </AccordionDetails>
                        </Accordion>)
                }) : <></>
            }
        </div>
    )
}
