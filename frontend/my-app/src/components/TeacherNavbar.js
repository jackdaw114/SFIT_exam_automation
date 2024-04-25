import { Box, Typography } from "@mui/material";
import { getScrollbarWidth, useBodyScrollable } from "./hooks/useBodyScrollable";
import { useLayoutEffect } from "react";




export function TeacherNavbar({ handleItemClick, list_items }) {

    return (
        <div className="fixed h-full  flex flex-col bg-zinc-800 items-center  w-1/5 font-['ubuntu'] " >
            <Box className=" flex w-4/5 bg-inherit py-5  justify-center items-center" sx={{ borderBottom: 3, borderBottomColor: '#136F63' }} >
                <Typography className=" font-['ubuntu'] text-white/90 " variant="h4">Navigation</Typography>
            </Box>
            <div className="h-full bg-inherit text-white/90 py-6">
                {list_items.map((item) => (
                    <div key={item} onClick={() => handleItemClick(item)} className="cursor-pointer hover:text-secondary transition-all duration-200 py-5 px-5 text-center">{item}</div>
                ))}
            </div>
        </div>
    )
}