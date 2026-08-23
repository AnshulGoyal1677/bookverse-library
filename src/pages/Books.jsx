import React, { useState } from 'react';
import BookGrid from '../components/BookGrid';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { books } from '../data/books';

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
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Explore Our Book Collection</h1>
        <p style={styles.subtitle}>Discover your next favorite read from our curated catalogue.</p>
      </header>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main style={styles.main}>
        <BookGrid books={filteredBooks} />
      </main>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px',
    minHeight: '80vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#1a202c'
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096'
  },
  main: {
    marginTop: '16px'
  }
};

export default Books;