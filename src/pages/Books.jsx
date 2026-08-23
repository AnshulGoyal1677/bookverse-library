import React from 'react';
import BookGrid from '../components/BookGrid';
import { books } from '../data/books';

function Books() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Explore Our Book Collection</h1>
        <p style={styles.subtitle}>Discover your next favorite read from our curated catalogue.</p>
      </header>

      <main style={styles.main}>
        <BookGrid books={books} />
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