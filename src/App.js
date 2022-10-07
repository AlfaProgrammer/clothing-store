import {Routes, Route} from "react-router-dom";
import NavBar from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component"
import SignIn from "./routes/sign-in/sign-in.component";

const Shop = () => {
  return <h1>Questo è il mio SHOP COMPONENT</h1>
}

const App = () => {
  return (
    <Routes> {/*dice che si aspetta di trovare delle rotte*/}
      {/* quali rotte?  */}
      <Route path="/*" element={<NavBar />}> 
        <Route index element={<Home/>} />
        <Route path="shop" element={<Shop/>}/>
        <Route path="sign-in" element={<SignIn />}/> 
      </Route>
    </Routes>
  );
}

export default App;