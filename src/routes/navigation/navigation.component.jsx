import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink
} from "./navigation.styles";

const NavBar = () => {
  // quando un valore dentro un HOOK cambia vene ri-renderizzato il componente
  // prendiamo i valori currentUser e isCartOpen dai rispettivi Context
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
   
    return(
      <Fragment>
        <NavigationContainer>
          <LogoContainer to="/">
              <CrwnLogo className="logo"/>
          </LogoContainer>
          
          <NavLinksContainer>
            <NavLink to="/shop">SHOP</NavLink>

            {/* se il currentUser esiste significa che è loggato */}
            {currentUser? (
              <NavLink as="span" onClick={signOutUser}> 
                Sign-Out 
              </NavLink>) : (
              <NavLink to="/auth">
                Sign-in
              </NavLink>
              )
              }            
            <CartIcon/>
          </NavLinksContainer>
          {/* Total Statement deve essere true, quindi sia il valore di destra che di sinistra se sono true mi restituisce
          quello di destra(l'ultimo). Un componente è sempre === true xke è una funzione */}
          {/* Se uno dei valori è false JS esce da questa operazione immediatamente */}
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        
        <Outlet />
        
      </Fragment>
    )
  }

export default NavBar;