import { getCategloriesAndDocument } from "../utils/firebase/firebase.utils";
import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from "../shop-data.js"; //i dati sono già stati inseriti nel DB, non devo più prenderli dal file.

export const CategoriesContext = createContext({
    categoriesMap: {},
    // setProducts: null
});

export const CategoriesProvider = ({children}) =>{
    // eslint-disable-next-line no-unused-vars
    const [categoriesMap, setCategoriesMap] = useState({});
    
    useEffect(()=>{
        //dentro use effect devi utilizzare async in questo modo,
        //non rendere la callback stessa async
        const getCategoriesMap = async () => {
            const categoryMap = await getCategloriesAndDocument();
            // console.log(categoryMap);
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap();
    },[]);

    const value = {categoriesMap};
    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}
