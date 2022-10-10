import "./product-card.styles.scss";
import Button from "../button/button.component";

const ProductCard = ({product}) => { // ProductCard.props avrà un parametro chiamato product che 
    //sarà il singolo prodotto dell'array proveniente dal context. 
    const {name, price, imageUrl} = product;

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/>
            <div className="footer">
                <span className="name"> {name} </span>
                <span className="price"> {price} </span>
            </div>
            <Button buttonType="inverted">Add to cart</Button>
        </div> 
    )
}

export default ProductCard;