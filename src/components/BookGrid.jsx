import React from 'react';
import BookCard from './BookCard';

function BookGrid({ books }) {
  if (books.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>No books found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '24px',
    padding: '16px 0'
  },
  emptyState: {
    padding: '48px 0',
    textAlign: 'center',
    color: '#718096',
    fontSize: '18px'
  }
};

export default BookGrid;