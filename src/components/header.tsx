import React, { useState } from "react";
import LogOutInbutton from "./login-out_button";
import Navigation from "./nav";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-dark-navy text-white h-16 flex items-center justify-between px-4">
      <div>
        <a href="#" className="text-2xl font-bold">
          Your Logo
        </a>
      </div>
      <div className="flex items-center">
        <Navigation />
        <button
          className="bg-white text-black rounded-full px-4 py-2 mr-4 hover:bg-gray-200 md:hidden"
          onClick={toggleMenu}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="menu w-6 h-6">
            <path
              fillRule="evenodd"
              d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM1 10a1 1 0 011-1h14a1 1 0 110 2H2a1 1 0 01-1-1zM3 15a1 1 0 100 2h14a1 1 0 100-2H3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <LogOutInbutton />
      </div>
      <div
        className={`absolute top-16 left-0 w-full bg-dark-navy text-white ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <ul className="py-4">
          <li className="mx-4 my-2">
            <a href="#" className="hover:text-gray-300">
              Menu 1
            </a>
          </li>
          <li className="mx-4 my-2">
            <a href="#" className="hover:text-gray-300">
              Menu 2
            </a>
          </li>
          <li className="mx-4 my-2">
            <a href="#" className="hover:text-gray-300">
              Menu 3
            </a>
          </li>
        </ul>
        <button className="bg-white text-black rounded-full px-4 py-2 my-2 mx-4 hover:bg-gray-200">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
