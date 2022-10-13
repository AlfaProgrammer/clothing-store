//questo sarà il componente toggle quando fai click sul cart-icon nel nav component
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom"; 


import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandeler = () => {
        navigate("/checkout")
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                { cartItems.length ? cartItems.map( (item) => {
                    return (<CartItem key={item.id} cartItem={item}/>)
                }) : (
                    <EmptyMessage>Your cart is Empty</EmptyMessage>
                )
                
                } 
            </CartItems>

            <Button onClick={goToCheckoutHandeler}>CHECKOUT</Button>

        </CartDropdownContainer>
    );
}

export default CartDropdown;