import React, { useState } from 'react';
import BookGrid from '../components/BookGrid';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { books } from '../data/books';
import './Books.css';

const categories = ['All', ...new Set(books.map((book) => book.category))];

function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = books.filter((book) => {
    const term=searchTerm.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term);
    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;    
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="books-container">
      <header className="books-header">
        <h1 className="books-title">Explore Our Book Collection</h1>
        <p className="books-subtitle">
          Discover your next favorite read from our curated catalogue.
        </p>
      </header>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main>
        <BookGrid books={filteredBooks} />
      </main>
    </div>
  );
}

export default Books;