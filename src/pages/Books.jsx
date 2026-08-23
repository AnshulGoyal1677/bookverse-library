import React, { useState } from 'react';
import BookGrid from '../components/BookGrid';
import SearchBar from '../components/SearchBar';
import { books } from '../data/books';

function Books() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter((book) => {
    const term=searchTerm.toLowerCase();
    const titleMatch = book.title.toLowerCase().includes(term);
    const authorMatch = book.author.toLowerCase().includes(term);
    return titleMatch || authorMatch;
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Explore Our Book Collection</h1>
        <p style={styles.subtitle}>Discover your next favorite read from our curated catalogue.</p>
      </header>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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