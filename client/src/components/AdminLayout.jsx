import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminTopBar from "./AdminTopBar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <span>
        <AdminNavbar />
      </span>
      <div className="w-full relative z-0">
        <AdminTopBar />
        <div className="px-6 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
