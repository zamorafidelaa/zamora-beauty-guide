import { Route, Routes } from "react-router-dom";
import UserHeader from "../components/user/UserHeader";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Consultation from "../pages/user/Consultation";
import UserFooter from "../components/user/UserFooter";
import Product from "../pages/user/Product";

const UserRoutes = () => {
  return (
    <div>
      <UserHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/search-skincare" element={<Product />} />
      </Routes>
      <UserFooter/>
    </div>
  );
};

export default UserRoutes;
