import { Link } from "react-router-dom";
import { getAllBooks } from "../utils/bookManagement";
import { useSelector } from "react-redux";
import BookGrid from "../components/BookGrid";
import "./Wishlist.css";

function Wishlist() {
  const allBooks = getAllBooks();

  // The wishlist ids come from the Redux store, so this page redraws
  // by itself whenever the wishlist changes.
  const savedIds = useSelector((state) => state.wishlist.ids);
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
