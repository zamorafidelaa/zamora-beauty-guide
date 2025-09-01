import AdminFooter from "../components/admin/AdminFooter";
import DashboardLayout from "../components/admin/DashboardLayout";
import { Outlet } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <div>
      <DashboardLayout>
      <Outlet /> {/* Admin atau Complaints akan muncul di sini */}
      <AdminFooter />
    </DashboardLayout>
      
      <AdminFooter />
    </div>
  );
};

export default AdminRoutes;
