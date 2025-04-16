import Logo from "./Logo";
import { Link } from "react-router-dom";
import Button from "./Button";
import useAuthContext from "../hooks/useAuthContext";
import profilePlaceholder from "../assets/profilePlaceholder.png";
import { Bell, Inbox, Plus, User } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="h-20 w-full shadow fluid">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Logo classname="object-contain h-5" />

          <ul className="items-center gap-10 hidden lg:flex">
            <li className="hover:underline underline-offset-2 transition-all duration-300">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline underline-offset-2 transition-all duration-300">
              <Link to="/listings">Listings</Link>
            </li>
            <li className="hover:underline underline-offset-2 transition-all duration-300">
              <Link to="/aboutus">About Us</Link>
            </li>
          </ul>
        </div>

        {user ? (
          <div className="inline-flex items-center gap-2">
            <Link to="/create" className="btn-neutral">
              <Plus className="size-4" />
              <p className="text-sm font-medium">Create</p>
            </Link>
            <Link
              to="/inbox"
              className="btn-neutral !p-2 !rounded-full aspect-square !hidden md:!flex"
            >
              <Inbox className="size-5" />
            </Link>
            <Link
              to="/notifications"
              className="btn-neutral !p-2 !rounded-full aspect-square !hidden md:!flex"
            >
              <Bell className="size-5" />
            </Link>
            <DropdownMenu
              trigger={
                <div className="rounded-full size-10 overflow-hidden flex items-center justify-center">
                  <img src={profilePlaceholder} className="object-contain" />
                </div>
              }
            >
              <ul className="w-full space-y-1">
                <Link to="/inbox" className="w-full">
                  <li className="dropdown-menu-item">
                    <Inbox className="size-5" /> Inbox
                  </li>
                </Link>
                <Link to="/notifications" className="w-full">
                  <li className="dropdown-menu-item">
                    <Bell className="size-5" /> Notifications
                  </li>
                </Link>
                <Link to="/profile" className="w-full">
                  <li className="dropdown-menu-item">
                    <User className="size-5" /> Profile
                  </li>
                </Link>
              </ul>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/signup" className="font-medium">
              Signup
            </Link>
            <Link to="/login">
              <Button classname="" placeholder="Login" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
