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

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cartItem to remove 
    const existingCartItem = cartItems.find((item) => {
        return item.id === cartItemToRemove.id;
    });
    //check if quantity greater or eqaul to 1
    if(existingCartItem.quantity === 1){
        // teniamo tutti gli item che non corrispondono al id di cartItemToRemove
        return cartItems.filter((item)=> item.id !== cartItemToRemove.id)
    }
    //ritorniamo i cartItems. Prima però decremntiamo la quantità del matching item
    return cartItems.map((item) => 
        item.id === cartItemToRemove.id
        ? {...item, quantity: item.quantity - 1}
        : item 
    );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter( (item) => item.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [], //per lo storage di un prodotto insiema alla sua quantità 
    addItemToCart: () => {}, //innescata quando un utente clicca su addToCart button
    removeItemFromCart: () => {},
    clearItemFromCart: () => {}, // click su x o cestino 
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect( ()=> { // questa callback verrà eseguita ogni volta che una dependecie nell'array cambia
        const newCartCount = cartItems.reduce((acc, currItem) => acc += currItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect( ()=>{
        const newCartTotal = cartItems.reduce( (acc, currItem) => {
            return acc += currItem.quantity * currItem.price;
        }, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        //siccumo addCartItem ritorna un array, questo verrà preso e settato come cartItems
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems,cartItemToClear));
    }
    
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal
    };

    return(
        <CartContext.Provider value={value}> {children} </CartContext.Provider>
    );
}