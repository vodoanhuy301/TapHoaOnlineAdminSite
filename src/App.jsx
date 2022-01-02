import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "normalize.css";
import Home from "./pages/Home";
import ProductManager from "./pages/ProductManager";
import UserManagement from "./pages/UserManagement";
import OrderManagement from "./pages/OrderManagement";
import OrderDetail from "./pages/OrderDetail";
import {useSelector} from "react-redux";
import BannerManagement from './pages/BannerManagement';
function App() {
  const user = useSelector((state) => state.admin.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}>
        </Route>
        {user && <Route path="/product" element={<ProductManager/>}>
        </Route>}
        {user && <Route path="/user" element={<UserManagement/>}>
        </Route>}
        {user && <Route path="/order" element={<OrderManagement/>}>
        </Route>}
        {user && <Route path="/banner" element={<BannerManagement/>}>
        </Route>}
        {user && <Route path="/donhang/:id" element={<OrderDetail/>}>
        </Route>}
      </Routes>
    </Router>
  );
}

export default App;
