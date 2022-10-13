import { useContext } from "react"; //devo utilizzare il context qui perché il button per l'aggiunta al carrello è su ogni prodotto
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";

import "./product-card.styles.scss";

const ProductCard = ({product}) => { // ProductCard.props avrà un parametro chiamato product che 
    //sarà il singolo prodotto dell'array proveniente dal context. 
    const {name, price, imageUrl} = product;
    const {addItemToCart} = useContext(CartContext); 

    const addProductToCart = () => addItemToCart(product);

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className="footer">
                <span className="name"> {name} </span>
                <span className="price"> ${price} </span>
            </div>
            <Button onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to cart</Button>
        </div> 
    )
}

export default ProductCard;