import { Route, Routes } from "react-router-dom";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Consultation from "../pages/user/Consultation";
import Product from "../pages/user/Product";

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
