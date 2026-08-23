import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Temporary placeholders for team integration
function CataloguePlaceholder() {
    return <div className="p-16 text-center font-serif text-2xl">Catalogue Page (Member 2 Placeholder)</div>;
}

function ProfilePlaceholder() {
    return <div className="p-16 text-center font-serif text-2xl">Profile / Account Page (Member 3 Placeholder)</div>;
}

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-[#FDFCF8] text-[#1A1F2C]">
                {/* Navbar is shared across all pages */}
                <Navbar />

                {/* Main content area where routes render */}
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalogue" element={<CataloguePlaceholder />} />
                        <Route path="/profile" element={<ProfilePlaceholder />} />
                    </Routes>
                </main>

                {/* Footer is shared across all pages */}
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;