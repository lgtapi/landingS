"use client";

import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-black text-white p-4 shadow-2xl">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Image src="/logo.png" alt="SHEBN Logo" width={50} height={50} className="mr-4" />
          

          <div className="hidden md:flex items-center space-x-6">
            <a href="#form-section" className="hover:text-pink-500 transition-colors duration-300">Home</a>
            <a href="#form-section" className="hover:text-pink-500 transition-colors duration-300">Profiles</a>
            <a href="#form-section" className="hover:text-pink-500 transition-colors duration-300">Projects</a>
            <a href="#form-section" className="hover:text-pink-500 transition-colors duration-300">Forum</a>
            <a href="#research" className="hover:text-pink-500 transition-colors duration-300">Research</a>
            <a href="#form-section" className="hover:text-pink-500 transition-colors duration-300">Contact Us</a>
          </div>
        </div>
        <div className="block md:hidden">
          <button onClick={toggleMobileMenu} className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-pink-500 hover:border-pink-500">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z"/></svg>
          </button>
        </div>
        <div className="hidden md:block">
          <a href="#form-section" className="inline-block text-sm px-4 py-2 leading-none border rounded-2xl text-white border-white transition-colors duration-300 ring-1 shadow-2xl" style={{ borderColor: '#FF29D7' }}>
            Join the waitlist
          </a>
        </div>
        <div className={`w-full flex-grow md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#form-section" className="block hover:text-pink-500">Home</a>
            <a href="#form-section" className="block hover:text-pink-500">Profiles</a>
            <a href="#form-section" className="block hover:text-pink-500">Projects</a>
            <a href="#form-section" className="block hover:text-pink-500">Forum</a>
            <a href="#research" className="block hover:text-pink-500">Research</a>
            <a href="#form-section" className="block hover:text-pink-500">Contact Us</a>
            <a href="#form-section" className="mt-4 block px-4 py-2 leading-none border rounded-2xl text-white border-white transition-colors duration-300 ring-1 shadow-2xl" style={{ borderColor: '#FF29D7' }}>
              Join the waitlist
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 