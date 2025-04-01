import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminTopBar from "./AdminTopBar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminNavbar />
      <div className="flex-1 relative">
        <AdminTopBar />
        <div className="px-6 py-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
