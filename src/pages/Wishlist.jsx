import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWishlist } from "../utils/wishlist";
import WishlistButton from "../components/WishlistButton";

export default function Wishlist() {
  // 1. Local state to store the wishlist array
  const [wishlistItems, setWishlistItems] = useState([]);

  // 2. Load saved books from localStorage when page loads
  useEffect(() => {
    const savedBooks = getWishlist();
    setWishlistItems(savedBooks);
  }, []);

  // 3. Callback function: updates UI when a book is removed
  const handleWishlistToggle = (inWishlist, bookId) => {
    if (!inWishlist) {
      // Remove the item from state so it disappears immediately
      const updatedList = wishlistItems.filter((book) => book.id !== bookId);
      setWishlistItems(updatedList);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "0 20px" }}>
      <h1>My Wishlist</h1>
      <p style={{ color: "#6b7280" }}>Books you have saved to read later.</p>

      {/* 4. Conditional Rendering: Empty State vs Books List */}
      {wishlistItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", border: "1px dashed #ccc", borderRadius: "8px" }}>
          <p>Your wishlist is currently empty.</p>
          <Link to="/">Explore Catalogue</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
          {wishlistItems.map((book) => (
            <div key={book.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px", backgroundColor: "#fff" }}>
              <span style={{ fontSize: "12px", color: "#0369a1", fontWeight: "bold" }}>
                {book.category}
              </span>
              <h3 style={{ margin: "10px 0 5px" }}>{book.title}</h3>
              <p style={{ margin: "0 0 15px", color: "#555" }}>by {book.author}</p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eee", paddingTop: "10px" }}>
                <Link to={`/books/${book.id}`} style={{ color: "#2563eb", textDecoration: "none" }}>
                  View Details →
                </Link>
                {/* Reusable toggle button */}
                <WishlistButton book={book} onToggle={handleWishlistToggle} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
