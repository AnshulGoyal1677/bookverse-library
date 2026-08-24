import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-surface w-full top-0 sticky shadow-sm z-50 transition-all duration-200 ease-in-out">
            <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-[1280px] mx-auto">
                {/* Brand */}
                <Link className="font-serif text-2xl md:text-3xl font-bold text-[#030612]" to="/">
                    BookVerse
                </Link>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex gap-8 font-medium text-base text-[#45464c]">
                    <NavLink 
                        to="/catalogue" 
                        className={({ isActive }) => isActive ? "text-[#7d562d] font-semibold" : "hover:text-[#7d562d] transition-colors"}
                    >
                        Catalogue
                    </NavLink>
                    <NavLink 
                        to="/profile" 
                        className={({ isActive }) => isActive ? "text-[#7d562d] font-semibold" : "hover:text-[#7d562d] transition-colors"}
                    >
                        Profile
                    </NavLink>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link className="hidden md:inline-flex text-[#45464c] hover:text-[#7d562d] transition-colors font-medium text-sm" to="/profile">
                        Login
                    </Link>
                    <Link className="bg-[#1a1f2c] text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-[#030612] transition-colors" to="/profile">
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;