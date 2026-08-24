import React from 'react';

function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.coverImage} alt={book.title} className="book-card-image"/>
      <div className="book-card-content">
        <span className="book-card-category">{book.category}</span>
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">by {book.author}</p>
        <div className="book-card-footer">
          <span className="book-card-rating">⭐ {book.rating}</span>
          <span className="book-card-price">${book.price.toFixed(2)}</span>
        </div>
        <button className="book-card-btn">Add to Cart</button>
      </div>
    </div>
  );
}

export default BookCard;