import React from 'react';

function BookCard({ book }) {
  return (
    <div className="book-card" style={styles.card}>
      <img 
        src={book.coverImage} 
        alt={book.title} 
        style={styles.image} 
      />
      <div style={styles.content}>
        <span style={styles.category}>{book.category}</span>
        <h3 style={styles.title}>{book.title}</h3>
        <p style={styles.author}>by {book.author}</p>
        <div style={styles.footer}>
          <span style={styles.rating}>⭐ {book.rating}</span>
          <span style={styles.price}>${book.price.toFixed(2)}</span>
        </div>
        <button style={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#ffffff',
    width: '240px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#1a202c'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  category: {
    fontSize: '12px',
    color: '#4a5568',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  title: {
    fontSize: '18px',
    margin: '4px 0',
    color: '#1a202c'
  },
  author: {
    fontSize: '14px',
    color: '#718096',
    margin: '0 0 8px 0'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  rating: {
    fontSize: '14px',
    fontWeight: 'bold'
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2b6cb0'
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default BookCard;