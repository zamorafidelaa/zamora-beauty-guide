import { Route, Routes } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import Admin from "../pages/admin/Admin";
import AdminFooter from "../components/admin/AdminFooter";
import Complaints from "../pages/admin/Complaints";

const AdminRoutes = () => {
  return (
    <div>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/complaints" element={<Complaints />} />
      </Routes>
      <AdminFooter />
    </div>
  );
};

export default AdminRoutes;
