// src/utils/wishlist.js
// Small helper functions for saving wishlist book IDs in localStorage.
// The wishlist is just an array of book IDs, e.g. [1, 3, 5]
//
// Each logged-in user gets their own wishlist, saved under a key that
// includes their email. Visitors who are not logged in use the plain key.

const WISHLIST_KEY = "bookverse_wishlist";

function getWishlistKey() {
  const savedSession = localStorage.getItem("bookverse_session");

  if (savedSession) {
    const user = JSON.parse(savedSession);
    return WISHLIST_KEY + "_" + user.email;
  }

  return WISHLIST_KEY;
}

export function getWishlist() {
  const saved = localStorage.getItem(getWishlistKey());
  return saved ? JSON.parse(saved) : [];
}

export function isInWishlist(bookId) {
  const wishlist = getWishlist();
  return wishlist.includes(bookId);
}

export function addToWishlist(bookId) {
  const wishlist = getWishlist();
  if (!wishlist.includes(bookId)) {
    wishlist.push(bookId);
    localStorage.setItem(getWishlistKey(), JSON.stringify(wishlist));
  }
}

export function removeFromWishlist(bookId) {
  const wishlist = getWishlist().filter((id) => id !== bookId);
  localStorage.setItem(getWishlistKey(), JSON.stringify(wishlist));
}
