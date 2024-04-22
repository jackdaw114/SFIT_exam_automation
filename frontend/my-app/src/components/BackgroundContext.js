import { Box } from "@mui/material";
import { createContext, useState } from "react";

export const BackgroundContext = createContext()


export const BackgroundProvider = ({ children }) => {
    const [customBackgroundColor, setCustomBackgroundColor] = useState('#ffffff');

    return (
        <BackgroundContext.Provider value={{ setCustomBackgroundColor, customBackgroundColor, }}>
            {children}
        </BackgroundContext.Provider>
    );
};

