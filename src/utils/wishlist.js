// src/utils/wishlist.js
// Small helper functions for saving wishlist book IDs in localStorage.
// The wishlist is just an array of book IDs, e.g. [1, 3, 5]

const WISHLIST_KEY = "bookverse_wishlist";

export function getWishlist() {
  const saved = localStorage.getItem(WISHLIST_KEY);
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
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }
}

export function removeFromWishlist(bookId) {
  const wishlist = getWishlist().filter((id) => id !== bookId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}
