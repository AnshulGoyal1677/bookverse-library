import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContext } from "../context/ToastContext";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";

function WishlistButton({ bookId }) {
  const { showToast } = useContext(ToastContext);
  const dispatch = useDispatch();

  // useSelector READS from the store: true if this book is in the wishlist.
  const saved = useSelector((state) => state.wishlist.ids.includes(bookId));

  const handleClick = () => {
    // dispatch SENDS a message (action) to the store to change the wishlist.
    if (saved) {
      dispatch(removeFromWishlist(bookId));
      showToast("Removed from your wishlist.", "success");
    } else {
      dispatch(addToWishlist(bookId));
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
