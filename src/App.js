import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../src/Componets/Home/Home";
import Pets from "../src/Componets/Adoption/Pets";
import Details from "../src/Componets/Details/Details";
import Login from "../src/Componets/Login/Login";
import LandingPage from "../src/Componets/LandingPage/LandingPage";
import NotFound from "../src/Componets/NotFound/NotFound";
import Donate from "./Componets/Donate/Donate";
import AboutUs from "./Componets/AboutUs/AboutUs";
import Shop from "./Componets/Shop/Shop";
import FormPostPet from "./Componets/FormPostPet/FormPostPet";
import FormPostUser from "./Componets/FormPostUser/FormPostUser";
import FormPostProduct from "./Componets/DashboardAdmin/Dashboard/FormPostProduct";
import FormAffiliateVets from "./Componets/DashboardAdmin/Dashboard/FormAffiliateVets";
import FormUpdateProduct from "./Componets/DashboardAdmin/Dashboard/FormUpdateProduct";
import Veterinaries from "../src/Componets/Veterinaries/Veterinaries";
import DashboardAdmin from "./Componets/DashboardAdmin/DashboardAdmin/DashboardAdmin";
import ProductDetail from "./Componets/Shop/ProductDetail/ProductDetail";
import VetsDetails from "./Componets/VetsDetail/VetsDetail";
import { MyPets } from "./Componets/MyPets/MyPets";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import CreateUserAuth0 from "./Componets/CreateUserAuth0/CreateUserAuth0";
import Cart from "./Componets/Shop/Cart/Cart";
import Banned from "./Componets/Banned/Banned";

function App() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const loggedUser = localStorage.getItem("loggedUser");

  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    const validator = async () => {
      const isVerify = await getAccessTokenSilently();
      setToken(isVerify);
    };
    validator();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (loggedUser) {
      const logged = JSON.parse(loggedUser);
      setUsuario(logged);
    }
  }, []);

  // console.log(usuario);
  return usuario[0]?.status === "banned" ? (
    <div className="App">
      <Routes>
        <Route exact path="/banned" element={<Banned />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  ) : (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          path="/shop/product/:productId"
          element={<ProductDetail />}
        ></Route>
        <Route exact path="/shop/cart" element={<Cart />}></Route>
        <Route exact path="/banned" element={<Banned />}></Route>
        <Route exact path="/donate" element={<Donate />}></Route>
        <Route
          exact
          path="/createPet"
          element={<FormPostPet token={token} />}
        ></Route>
        <Route
          exact
          path="/updatePet/:id"
          element={<FormPostPet token={token} value={"update"} />}
        ></Route>
        <Route exact path="/createAuth0" element={<CreateUserAuth0 />}></Route>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/createUser" element={<FormPostUser />}></Route>
        <Route
          exact
          path="/updateUser"
          element={<FormPostUser id={usuario.id} value={"update"} />}
        ></Route>
        <Route
          exact
          path="/updateUser"
          element={<FormPostUser value={"update"} />}
        ></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/aboutUs" element={<AboutUs />}></Route>
        <Route exact path="/pets/:paramsId" element={<Details />}></Route>
        <Route
          exact
          path="/adoptions"
          element={<Pets value={"adoptions"} />}
        ></Route>
        <Route
          exact
          path="/lostPets"
          element={<Pets value={"lostPets"} />}
        ></Route>
        <Route exact path="/myPets" element={<MyPets />}></Route>
        <Route exact path="/veterinary" element={<Veterinaries />}></Route>
        <Route exact path="/shop" element={<Shop />}></Route>
        <Route
          exact
          path="/veterinary/:paramsId"
          element={<VetsDetails />}
        ></Route>
        <Route
          exact
          path="/dashboard/createProduct"
          element={<FormPostProduct />}
        ></Route>
        <Route
          exact
          path="/dashboard/createVet"
          element={<FormAffiliateVets />}
        ></Route>
        <Route
          exact
          path="/dashboard/updateProduct"
          element={<FormUpdateProduct />}
        ></Route>
        <Route exact path="/dashboard" element={<DashboardAdmin />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
