import { useState, useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { addToWishlist, removeFromWishlist, isInWishlist } from "../utils/wishlist";

function WishlistButton({ bookId }) {
  const { showToast } = useContext(ToastContext);
  const [saved, setSaved] = useState(isInWishlist(bookId));

  const handleClick = () => {
    if (saved) {
      removeFromWishlist(bookId);
      setSaved(false);
      showToast("Removed from your wishlist.", "success");
    } else {
      addToWishlist(bookId);
      setSaved(true);
      showToast("Added to your wishlist.", "success");
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
