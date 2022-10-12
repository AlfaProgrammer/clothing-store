import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => { //questa funzione in ogni caso deve ritornare un array
    const existingCartItem = cartItems.find((cartItem) => { 
        //ritorna il primo elemento che soddisfa la condizione sotto
        return cartItem.id === productToAdd.id;
    })
    //se il prodotto esiste già voglio ritornare un array che però ha quel singolo prodotto incrementato di 1
    if(existingCartItem){
        return cartItems.map((item) => item.id === productToAdd.id 
            ? {...item, quantity: item.quantity + 1} 
            : item 
        );
    }

    //ritorno un nuovo array con tutti i pordotti già esistenti di cartItems
    //più il nuovo prodotto (che però deve avere un nuovo parametro quantity) 
    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [], //per lo storage di un prodotto insiema alla sua quantità 
    addItemToCart: () => {}, //innescata quando un utente clicca su addToCart button
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect( ()=> { // questa callback verrà eseguita ogni volta che una dependecie nell'array cambia
        const newCartCount = cartItems.reduce((acc, currItem) => acc += currItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);
    
    const addItemToCart = (productToAdd) => {
        //siccumo addCartItem ritorna un array, questo verrà preso e settato come cartItems
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return(
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    );
}