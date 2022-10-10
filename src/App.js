import {Routes, Route} from "react-router-dom";
import NavBar from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";



const App = () => {
  return (
    <Routes> {/*dice che si aspetta di trovare delle rotte*/}
      {/* quali rotte?  */}
      <Route path="/*" element={<NavBar />}> 
        <Route index element={<Home/>} />
        <Route path="shop" element={<Shop/>}/>
        <Route path="auth" element={<Authentication />}/> 
      </Route>
    </Routes>
  );
}

export default App;