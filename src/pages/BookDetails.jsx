import { useParams, Link, useNavigate } from "react-router-dom";
import { books } from "../data/books";
import { getUserBooks } from "../utils/bookManagement";
import WishlistButton from "../components/WishlistButton";
import DeleteBookButton from "../components/DeleteBookButton";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Route params are always strings, so convert to a number to match book.id
  const bookId = Number(id);
  const allBooks = [...books, ...getUserBooks()];
  const book = allBooks.find((b) => b.id === bookId);

  if (!book) {
    return (
      <div className="container book-details-page">
        <p>Sorry, we couldn't find that book.</p>
        <Link to="/catalogue" className="btn btn-outline">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleDeleted = () => {
    navigate("/catalogue");
  };

  return (
    <div className="container book-details-page">
      <Link to="/catalogue" className="back-link">
        ← Back to Catalogue
      </Link>

      <div className="book-details-card">
        <img src={book.coverImage} alt={book.title} className="book-details-image" />

        <div className="book-details-info">
          <span className="book-card-category">{book.category}</span>
          <h1>{book.title}</h1>
          <p className="book-details-author">by {book.author}</p>

          <div className="book-details-meta">
            <span className="book-card-rating">⭐ {book.rating}</span>
            <span className="book-card-price">${book.price.toFixed(2)}</span>
          </div>

          <p className="book-details-description">{book.description}</p>

          <div className="book-details-actions">
            <WishlistButton bookId={book.id} />
            {book.isUserAdded && (
              <DeleteBookButton bookId={book.id} onDeleted={handleDeleted} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
