import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWishlist } from "../utils/wishlist";
import WishlistButton from "../components/WishlistButton";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  // Load wishlist items on mount
  useEffect(() => {
    setItems(getWishlist());
  }, []);

  // Remove item from state when toggled off
  const handleRemove = (inWishlist, id) => {
    if (!inWishlist) {
      setItems(items.filter((book) => book.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "0 16px" }}>
      <h2>My Wishlist</h2>
      <p style={{ color: "#666" }}>Books saved for later reading.</p>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "30px", border: "1px dashed #ccc" }}>
          <p>Your wishlist is empty.</p>
          <Link to="/">Browse Books</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
          {items.map((book) => (
            <div
              key={book.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "12px 16px",
                borderRadius: "6px"
              }}
            >
              <div>
                <h4 style={{ margin: "0 0 4px" }}>{book.title}</h4>
                <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                  {book.author} — <em>{book.category}</em>
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <Link to={`/books/${book.id}`} style={{ fontSize: "14px", color: "#2563eb" }}>
                  Details
                </Link>
                <WishlistButton book={book} onToggle={handleRemove} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
