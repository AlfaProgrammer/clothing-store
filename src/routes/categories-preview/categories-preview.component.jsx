// importo di dati dal contexte dei dati
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
// ora recupero i singoli parametri del PorductContext
    const {categoriesMap} = useContext(CategoriesContext);

    return (
        <> 
            {Object.keys(categoriesMap).map((title)=>{
                const products = categoriesMap[title]
                return <CategoryPreview key={title} title={title} products={products}/>
            })}
        </>
    )
}

export default CategoriesPreview;