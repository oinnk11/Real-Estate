import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import icon from "../assets/icon.png";
import {
  Building,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Button from "./Button";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";
import Modal from "react-modal";

const AdminNavbar = () => {
  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Listings",
      path: "/listings",
      icon: Building,
    },
    {
      name: "Users",
      path: "/users",
      icon: User,
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: CreditCard,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const { logoutUser } = useAuthContext();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white w-[80px] lg:w-[300px] border-r h-screen sticky left-0 top-0 flex flex-col justify-between">
        <div className="h-full">
          <div className="border-b h-10 px-4">
            <img src={logo} className="object-contain h-5 mt-6 max-lg:hidden" />
            <img
              src={icon}
              className="object-contain h-5 mt-6 mx-auto lg:hidden"
            />
          </div>

          <ul className="flex flex-col max-lg:items-center px-4 mt-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={`/admin${link.path}`}
                  className="inline-flex items-center gap-2 hover:bg-primary/10 transition-colors w-full p-2 rounded-xl font-medium"
                >
                  <span className="size-10 aspect-square rounded-xl bg-sky-50 flex items-center justify-center mr-1">
                    <link.icon className="size-6 text-primary" />
                  </span>
                  <span className="hidden lg:block">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 pb-4">
          <Button
            classname="w-full max-lg:px-0 mt-auto"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            <LogOut className="mr-1 size-4" />
            <span className="max-lg:hidden">Logout</span>
          </Button>
        </div>
      </nav>

      {/* LOGOUT MODAL */}
      <Modal isOpen={isLogoutModalOpen} className="modal-bg">
        <div className="modal-card">
          <h2 className="modal-header">Are you sure you want to logout?</h2>

          <p className="modal-desc">
            You will have to login again using your email and password.
          </p>

          <div className="modal-footer">
            <button
              onClick={() => {
                setIsLogoutModalOpen(false);
              }}
              className="btn-neutral"
            >
              Cancel
            </button>
            <button onClick={() => logoutUser()} className="btn-danger">
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminNavbar;
