import { useState, useEffect } from "react";
import { isInWishlist, addToWishlist, removeFromWishlist } from "../utils/wishlist";

export default function WishlistButton({ book, onToggle }) {
  const [inWishlist, setInWishlist] = useState(false);

  // Sync state whenever the book prop changes or the component mounts
  useEffect(() => {
    if (book && book.id) {
      setInWishlist(isInWishlist(book.id));
    }
  }, [book]);

  const handleToggle = (e) => {
    // Stop click from bubbling up to parent cards/links
    e.stopPropagation();

    if (!book) return;

    if (inWishlist) {
      removeFromWishlist(book.id);
      setInWishlist(false);
      if (onToggle) onToggle(false, book.id);
    } else {
      addToWishlist(book);
      setInWishlist(true);
      if (onToggle) onToggle(true, book.id);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`wishlist-btn ${inWishlist ? "wishlist-btn-active" : ""}`}
      style={{
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid #d1d5db",
        backgroundColor: inWishlist ? "#fee2e2" : "#ffffff",
        color: inWishlist ? "#dc2626" : "#374151",
        cursor: "pointer",
        fontWeight: "500",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s ease"
      }}
    >
      <span>{inWishlist ? "♥" : "♡"}</span>
      <span>{inWishlist ? "In Wishlist" : "Add to Wishlist"}</span>
    </button>
  );
}