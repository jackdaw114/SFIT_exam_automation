import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from './axiosInstance'

const VerifyTeacherSubject = () => {
    const [unverifiedList, setUnverifiedList] = useState()
    useEffect(() => {
        axiosInstance.post('/get_unverified_teacher_subject', {}, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(
            setUnverifiedList()
        )
    })
    return (
        <div>

        </div>
    )
}

export default VerifyTeacherSubject