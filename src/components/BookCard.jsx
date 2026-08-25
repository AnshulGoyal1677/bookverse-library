import { Link } from "react-router-dom";
import "./BookCard.css";

function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.coverImage} alt={book.title} className="book-card-image" />

      <span className="book-card-category">{book.category}</span>
      <h3 className="book-card-title">{book.title}</h3>
      <p className="book-card-author">by {book.author}</p>

      <div className="book-card-footer">
        <span className="book-card-rating">⭐ {book.rating}</span>
        <span className="book-card-price">${book.price.toFixed(2)}</span>
      </div>

      <Link to={`/books/${book.id}`} className="btn btn-outline book-card-link">
        View Details
      </Link>
    </div>
  );
}

export default BookCard;
