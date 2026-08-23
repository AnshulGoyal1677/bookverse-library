import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getWishlist } from "../utils/wishlist";
import WishlistButton from "../components/WishlistButton";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist items on component mount
  useEffect(() => {
    setWishlistItems(getWishlist());
  }, []);

  // Callback to update state when an item is removed via WishlistButton
  const handleWishlistToggle = (inWishlist, bookId) => {
    if (!inWishlist) {
      setWishlistItems((prevItems) =>
        prevItems.filter((book) => book.id !== bookId)
      );
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", color: "#111827", margin: "0 0 8px" }}>
          My Wishlist
        </h1>
        <p style={{ color: "#6b7280", margin: 0 }}>
          Books you have saved for later reading.
        </p>
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 20px",
            backgroundColor: "#f9fafb",
            borderRadius: "12px",
            border: "1px dashed #d1d5db"
          }}
        >
          <p style={{ fontSize: "18px", color: "#4b5563", marginBottom: "16px" }}>
            Your wishlist is currently empty.
          </p>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500"
            }}
          >
            Explore Catalogue
          </Link>
        </div>
      ) : (
        /* Wishlist Grid */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px"
          }}
        >
          {wishlistItems.map((book) => (
            <div
              key={book.id}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
              }}
            >
              <div>
                <span
                  style={{
                    backgroundColor: "#e0f2fe",
                    color: "#0369a1",
                    padding: "3px 8px",
                    borderRadius: "9999px",
                    fontSize: "11px",
                    fontWeight: "600"
                  }}
                >
                  {book.category}
                </span>

                <h3 style={{ margin: "12px 0 6px", fontSize: "18px", color: "#1f2937" }}>
                  {book.title}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 12px" }}>
                  by {book.author}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "16px",
                  paddingTop: "12px",
                  borderTop: "1px solid #f3f4f6"
                }}
              >
                <Link
                  to={`/books/${book.id}`}
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  View Details →
                </Link>
                <WishlistButton book={book} onToggle={handleWishlistToggle} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
