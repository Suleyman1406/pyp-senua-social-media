import { createContext, useState } from "react";

export const postModuleContext = createContext([]);

export const PostModuleProvider = ({children}) => {

    const [show, setShow] = useState(false);
    
    const values = {
        show, 
        setShow
    }

    return <postModuleContext.Provider value={values}>{children}</postModuleContext.Provider>

}