import React from "react";
import Logo from "../components/Logo";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-[#0B192C] text-white">
      <div className="fluid py-12 md:py-24 flex gap-5 flex-col md:flex-row justify-between">
        <div className="space-y-6 w-full md:w-[60%]">
          <img src="logo-white.png" className="h-5 object-contain" />

          <p className="text-sm w-full md:max-w-[400px] text-white text-justify">
            Discover your dream home with ease. Our real estate platform offers
            a wide range of properties for sale and rent, tailored to fit your
            needs. Browse listings, explore neighborhoods, and find the perfect
            place to call home today.
          </p>

          <div className="space-y-2">
            <p className="font-medium text-sm">Find us on:</p>

            <div className="flex items-center gap-2">
              <a href="https://www.instagram.com">
                <Instagram />
              </a>
              <a href="https://www.facebook.com">
                <Facebook />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%]">
          <h3 className="font-semibold text-xl">Quick Links</h3>
          <ul className="space-y-2 mt-4">
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
      </div>
      <div className="border-t w-full py-3">
        <p className="text-center text-sm">
          Copyright &copy; Restate {year} - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
