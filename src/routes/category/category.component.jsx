//Category component viene importato dentro shop.component route. 
//Questo componente deve leggere il l'url è dinamicamente montare il componente corrispondende alla stringa dinamica del path
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = ()=>{
    const {category} = useParams();
    //in base alla categoy su path, dovro recuperare i dati di quella catecoria
    const {categoriesMap} = useContext(CategoriesContext); //ora recuperati tutti i dati delle categorie devo prendere solo quelle richieste dal path
    // const products = categoriesMap[category] si può fare ma è sconsigliato. Ricorda che con questo approccio
    // faresti questi passaggi tutte le volte che la funzione viene eseguita. A noi serve farlo solo quando category o categoriesMap cambiano
    // Meglio un useEffect insieme con useState
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(()=>{
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return(
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">
                {/* solo se products esiste fai la seconda operazione a destra
                perche se lo facesse subito non avrebbe ancora i dati recuperati dal context. Nel context i dati arrivano dal db quindi async */}
                {products &&
                    products.map((product)=>{
                    return <ProductCard key={product.id} product={product}/>
                })}
            </div>
        </>
    )
    
}

export default Category;