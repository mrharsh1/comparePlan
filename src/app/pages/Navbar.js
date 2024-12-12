"use client"
import { useState } from "react";
import Link from "next/link";
import Logo from "../img/logoo.png"
import Image from "next/image";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-30 backdrop-blur-lg p-4 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">
          <Image src={Logo} alt="logo" className="w-56" />
          </Link>
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex space-x-6">
          {/* <Link href="/about" className="text-black hover:text-gray-200">About
          </Link>
          <Link href="/services" className="text-black hover:text-gray-200">Services
          </Link>
          <Link href="/contact" className="text-black hover:text-gray-200">Contact
          </Link> */}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white bg-opacity-30 backdrop-blur-lg text-white space-y-4 p-4">
          <Link href="/about" onClick={toggleMenu} className="block hover:text-gray-200">About
          </Link>
          <Link href="/services" onClick={toggleMenu} className="block hover:text-gray-200">Services
          </Link>
          <Link href="/contact" onClick={toggleMenu} className="block hover:text-gray-200">Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
