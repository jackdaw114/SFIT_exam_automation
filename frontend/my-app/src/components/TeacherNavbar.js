import { Box, Button, Typography } from "@mui/material";
import { getScrollbarWidth, useBodyScrollable } from "./hooks/useBodyScrollable";
import { useContext, useEffect, useLayoutEffect } from "react";
import { NotifButton } from "./NotifButton";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BackgroundContext } from "./BackgroundContext";




export function TeacherNavbar({ list_items, type = null, buttons = null }) {
    const navigate = useNavigate();
    const { setCustomBackgroundColor } = useContext(BackgroundContext)
    useEffect(() => {
        setCustomBackgroundColor('#e7f1ef')
    })

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'false') {
            navigate('/')
        }

    }, [])

    return (
        <>
            <div className="fixed h-full  flex flex-col bg-zinc-800 items-center  w-1/5 font-['ubuntu'] " >
                <Box className=" flex w-4/5 bg-inherit pb-5 pt-10  justify-center items-center" sx={{ borderBottom: 3, borderBottomColor: '#136F63' }} >
                    <Typography className=" font-['ubuntu'] text-white/90 " variant="h4">Navigation</Typography>
                </Box>
                <div className="h-full bg-inherit text-white/90 py-7 flex flex-col items-center">

                    {list_items.map((item) => (

                        // <Link to={urls[ct++]}>
                        <Link to={item[1]} style={{ textDecoration: 'none' }}>
                            <div key={item} className="cursor-pointe text-white/90 hover:text-secondary transition-all duration-200 py-6 px-5 text-center">
                                {item[0]}
                            </div>
                        </Link>
                    ))
                    }

                    {type == "Admin" ? buttons.map((item) => (<Link to="notifications">
                        <div key={item} className="py-4"><NotifButton /></div>
                    </Link>
                    )) : <></>}


                </div>
            </div>
            <div className="flex h-full " style={{ maxWidth: '100vw' }}>
                <div className=" h-full" style={{ marginLeft: '20vw' }} ></div>
                <div className="  " style={{ width: '80vw' }}>

                    <div className="  " style={{ maxWidth: '80vw' }}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}