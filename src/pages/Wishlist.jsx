import { Link } from "react-router-dom";
import { books } from "../data/books";
import { getUserBooks } from "../utils/bookManagement";
import { getWishlist } from "../utils/wishlist";
import BookGrid from "../components/BookGrid";
import "./Wishlist.css";

function Wishlist() {
  // Reading from localStorage is synchronous, so we can compute the
  // wishlist books directly here instead of using useEffect.
  const allBooks = [...books, ...getUserBooks()];
  const savedIds = getWishlist();
  const wishlistBooks = allBooks.filter((book) => savedIds.includes(book.id));

  return (
    <div className="container wishlist-page">
      <header className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Books you've saved to read later.</p>
      </header>

      {wishlistBooks.length === 0 ? (
        <div className="empty-state">
          <p>Your wishlist is empty.</p>
          <Link to="/catalogue" className="btn btn-primary">
            Browse the Catalogue
          </Link>
        </div>
      ) : (
        <BookGrid books={wishlistBooks} />
      )}
    </div>
  );
}

export default Wishlist;
