import React from 'react';

function Navbar() {
    return (
        <nav className="bg-surface w-full top-0 sticky shadow-sm z-50 transition-all duration-200 ease-in-out">
            <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-[1280px] mx-auto">
                {/* Brand */}
                <a className="font-serif text-2xl md:text-3xl font-bold text-[#030612]" href="#">
                    BookVerse
                </a>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex gap-8 font-medium text-base text-[#45464c]">
                    <a className="hover:text-[#7d562d] transition-colors" href="#">Catalogue</a>
                    <a className="hover:text-[#7d562d] transition-colors" href="#">Profile</a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <a className="hidden md:inline-flex text-[#45464c] hover:text-[#7d562d] transition-colors font-medium text-sm" href="#">
                        Login
                    </a>
                    <a className="bg-[#1a1f2c] text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-[#030612] transition-colors" href="#">
                        Sign Up
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;