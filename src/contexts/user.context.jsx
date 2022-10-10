import { createContext, useState, useEffect } from "react";

//observable pattern da user insieme a useEffect
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    //default context values
    currentUser: null,
    setCurrentUser: () => null

});

export const UserProvider = ({children}) => { 
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                //questa funzione di firebase crea uno user nuovo se non esiste, e ne restituisce i dati
                //se esiste già ne restituisce i dati e basta.
                createUserDocumentFromAuth(user);
            }

            setCurrentUser(user);
        });

        return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}> {children} </UserContext.Provider>
}
