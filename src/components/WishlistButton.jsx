import { useState } from "react";
import { addToWishlist, removeFromWishlist, isInWishlist } from "../utils/wishlist";

function WishlistButton({ bookId }) {
  const [saved, setSaved] = useState(isInWishlist(bookId));

  const handleClick = () => {
    if (saved) {
      removeFromWishlist(bookId);
      setSaved(false);
    } else {
      addToWishlist(bookId);
      setSaved(true);
    }
  };

  return (
    <button
      className={saved ? "btn btn-primary" : "btn btn-outline"}
      onClick={handleClick}
    >
      {saved ? "♥ In Wishlist" : "♡ Add to Wishlist"}
    </button>
  );
}

export default WishlistButton;
