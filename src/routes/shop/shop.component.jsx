//tutti gli import che c'erano prima sono stati eliminati perché spostati dentro i componenti singoli che li utilizzano
//import come useContext e CategoriesContext sono stati spostati in CategoriesPreview route Component
import {Routes, Route} from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";

const Shop = () => {
    //Il path relativo di queste rotte lo trovi in App.js ed è "shop/*"
    //Qui stiamo cercando di fare delle rotte dinamiche nidificate sotto il path padre shop/
    return ( 
        <Routes>
            <Route index element={<CategoriesPreview />} /> 
            <Route path=":category" element={<Category />} /> 
            {/* :category, è la parte dinamica del mio path alla quele il componente category potra accedere e leggere
            grazie al HOOK useParams di react-router-dom */}
        </Routes>
    )
}

export default Shop;