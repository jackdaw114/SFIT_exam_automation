import { Badge, Button } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";


export function NotifButton({ }) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.post('/admin/get_unverified_teacher_subject', {}, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        });
    }, [])

    return (


        <Button variant="outlined" className=" text-teal-400 font-['Ubuntu'] border-none" >
            Subscription Requests
            {
                data ?
                    <span class=" ml-2 relative flex h-3 w-3 ">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                    </span>
                    :
                    <></>
            }
        </Button>

    )
}