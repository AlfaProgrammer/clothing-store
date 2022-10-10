import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss"

const NavBar = () => {
  // quando un valore dentro un HOOK cambia vene ri-renderizzato il componente
  // prendiamo i valori currentUser e isCartOpen dai rispettivi Context
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
   
    return(
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/">
              <CrwnLogo className="logo"/>
          </Link>
          
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">SHOP</Link>

            {/* se il currentUser esiste significa che è loggato */}
            {currentUser? (<span className="nav-link" onClick={signOutUser}> Sign-Out </span>) : (<Link className="nav-link" to="/auth">Sign-in</Link>)}            
            <CartIcon/>
          </div>
          {/* Total Statement deve essere true, quindi sia il valore di destra che di sinistra se sono true mi restituisce
          quello di destra(l'ultimo). Un componente è sempre === true xke è una funzione */}
          {/* Se uno dei valori è false JS esce da questa operazione immediatamente */}
          {isCartOpen && <CartDropdown/>}
        </div>
        
        <Outlet />
        
      </Fragment>
    )
  }

export default NavBar;