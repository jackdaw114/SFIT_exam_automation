import axios from 'axios'
import React, { useEffect, useState } from 'react'

const VerifyTeacherSubject = () => {
    const [unverifiedList, setUnverifiedList] = useState()
    useEffect(() => {
        axios.post('/get_unverified_teacher_subject', {}, {
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