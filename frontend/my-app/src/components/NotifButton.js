import { Button } from "@mui/material"


export const NotifButton = <Button variant="outlined" className=" text-teal-400 font-['Ubuntu'] border-none">
    Notifications
    <span class=" ml-2 relative flex h-3 w-3 ">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
    </span>
</Button>