// importo di dati dal contexte dei dati
import { useContext } from "react";
import { ProductsContext } from "../../contexts/porducts.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";

const Shop = () => {
// ora recupero i singoli parametri del PorductContext
    const {products} = useContext(ProductsContext);

    return (
        <div className="products-container">
            {products.map( (product) => {
                return (
                    <ProductCard product={product} key={product.id}/>
                )
            })}
        </div>
    )
}

export default Shop;