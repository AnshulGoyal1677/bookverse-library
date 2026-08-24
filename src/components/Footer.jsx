import React from 'react';

function Footer() {
    return (
        <footer className="bg-[#030612] w-full mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-8 max-w-[1280px] mx-auto gap-4">
                <div className="text-center md:text-left">
                    <a className="font-serif text-2xl text-white mb-1 block" href="#">BookVerse</a>
                    <p className="text-xs text-[#878784]">© 2026 BookVerse Digital Library. All rights reserved.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-xs">
                    <a className="text-[#878784] hover:text-[#f0bd8b] transition-colors opacity-80 hover:opacity-100" href="#">About Us</a>
                    <a className="text-[#878784] hover:text-[#f0bd8b] transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
                    <a className="text-[#878784] hover:text-[#f0bd8b] transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
                    <a className="text-[#878784] hover:text-[#f0bd8b] transition-colors opacity-80 hover:opacity-100" href="#">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;