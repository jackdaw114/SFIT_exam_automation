import { Box } from "@mui/material";
import { createContext, useState } from "react";

export const BackgroundContext = createContext()


export const BackgroundProvider = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    return (
        <BackgroundContext.Provider value={{ setBackgroundColor, backgroundColor, }}>
            {children}
        </BackgroundContext.Provider>
    );
};

