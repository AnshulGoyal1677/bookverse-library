import React from 'react';

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="px-6 md:px-16 py-12 md:py-24 max-w-[1280px] mx-auto text-center flex flex-col items-center justify-center min-h-[60vh] relative overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-[#ffdcbd]/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#dee2f4]/20 rounded-full blur-3xl -z-10"></div>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#030612] max-w-4xl mx-auto leading-tight mb-4">
                    Your journey through a thousand verses begins here.
                </h1>
                <p className="font-sans text-lg text-[#45464c] max-w-2xl mx-auto mb-8">
                    Discover a curated sanctuary of literature. Search for your next great read in our extensive digital library.
                </p>
                {/* Search Bar */}
                <div className="w-full max-w-2xl relative group">
                    <input 
                        className="w-full pl-6 pr-24 py-4 bg-[#f7f9fd] rounded-xl border border-[#c6c6cc] focus:border-[#7d562d] focus:ring-1 focus:ring-[#7d562d] transition-all text-base shadow-sm outline-none placeholder:text-[#45464c]/60" 
                        placeholder="Search by title, author, or keyword..." 
                        type="text" 
                    />
                    <button className="absolute inset-y-1 right-1 bg-[#1a1f2c] text-white px-6 rounded-lg font-medium text-sm hover:bg-[#030612] transition-colors">
                        Search
                    </button>
                </div>
            </section>

            {/* Featured Collections: New Arrivals */}
            <section className="py-8">
                <div className="px-6 md:px-16 max-w-[1280px] mx-auto mb-4 flex justify-between items-end">
                    <div>
                        <h2 className="font-serif text-2xl font-semibold text-[#030612]">New Arrivals</h2>
                        <p className="text-base text-[#45464c] mt-1">The latest additions to our curated shelves.</p>
                    </div>
                    <a className="hidden md:inline-flex items-center gap-1 text-[#7d562d] hover:text-[#f0bd8b] transition-colors font-medium text-sm" href="#">
                        View all →
                    </a>
                </div>
                {/* Horizontal Scroll Container */}
                <div className="w-full overflow-x-auto pb-8">
                    <div className="flex gap-6 px-6 md:px-16 mx-auto" style={{ width: 'max-content' }}>
                        {/* Book Card 1 */}
                        <div className="w-[240px] bg-white rounded-xl p-2 shadow-sm transition-all duration-300 flex flex-col group cursor-pointer">
                            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-[#f2f4f8]">
                                <div className="w-full h-full bg-[#e6e8ec] flex items-center justify-center text-xs text-[#76777c]">Book Cover 1</div>
                            </div>
                            <div className="p-1 flex-grow flex flex-col">
                                <h3 className="font-serif text-lg text-[#030612] mb-1 leading-snug">The Echoes of Silence</h3>
                                <p className="text-sm text-[#45464c] mb-2">Eleanor Vance</p>
                                <div className="mt-auto">
                                    <span className="bg-[#E5E7EB] text-[#030612] px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold">Fiction</span>
                                </div>
                            </div>
                        </div>
                        {/* Book Card 2 */}
                        <div className="w-[240px] bg-white rounded-xl p-2 shadow-sm transition-all duration-300 flex flex-col group cursor-pointer">
                            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-[#f2f4f8]">
                                <div className="w-full h-full bg-[#e6e8ec] flex items-center justify-center text-xs text-[#76777c]">Book Cover 2</div>
                            </div>
                            <div className="p-1 flex-grow flex flex-col">
                                <h3 className="font-serif text-lg text-[#030612] mb-1 leading-snug">Roots & Reason</h3>
                                <p className="text-sm text-[#45464c] mb-2">Dr. Aris Thorne</p>
                                <div className="mt-auto">
                                    <span className="bg-[#E5E7EB] text-[#030612] px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold">Science</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;