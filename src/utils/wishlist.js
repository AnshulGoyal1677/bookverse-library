const WISHLIST_STORAGE_KEY = "bookverse_wishlist";

// 1. Get all wishlist books from localStorage
export function getWishlist() {
  const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
  if (!saved) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Error reading wishlist from localStorage:", error);
    return [];
  }
}

// 2. Check if a specific book is already in the wishlist (by ID)
export function isInWishlist(bookId) {
  const list = getWishlist();
  return list.some((book) => book.id === Number(bookId));
}

// 3. Add a book to the wishlist
export function addToWishlist(book) {
  const list = getWishlist();
  const exists = list.some((item) => item.id === book.id);
  
  if (!exists) {
    const updated = [...list, book];
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
  return list;
}

// 4. Remove a book from the wishlist (by ID)
export function removeFromWishlist(bookId) {
  const list = getWishlist();
  const updated = list.filter((item) => item.id !== Number(bookId));
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}