import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="h-20 w-full px-4 md:px-12 lg:px-28 xl:px-40 shadow">
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

        <div className="flex items-center gap-4">
          <Link to="/signup" className="font-medium">
            Signup
          </Link>
          <Link to="/login">
            <Button classname="" placeholder="Login" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
