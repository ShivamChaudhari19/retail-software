import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategaryService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const[categories, SetCategories] = useState([]);

    useEffect( ()=>{
        async function loaData() {
            const response = await fetchCategories();
            SetCategories(response.data);
        } 
        loaData();
    }, [])

    const contextValue = {
        categories,
        SetCategories
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}