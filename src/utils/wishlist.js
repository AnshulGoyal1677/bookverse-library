const KEY = "bookverse_wishlist";

// 1. Get all saved wishlist books from localStorage
export function getWishlist() {
  const data = localStorage.getItem(KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

// 2. Check if a book ID is already inside the wishlist
export function isInWishlist(bookId) {
  const list = getWishlist();
  return list.some((item) => item.id === Number(bookId));
}

// 3. Add a new book to the wishlist
export function addToWishlist(book) {
  const list = getWishlist();
  
  // Check if book already exists to avoid duplicates
  const alreadyAdded = list.some((item) => item.id === book.id);
  if (!alreadyAdded) {
    const updatedList = [book, ...list];
    localStorage.setItem(KEY, JSON.stringify(updatedList));
    return updatedList;
  }
  
  return list;
}

// 4. Remove a book from the wishlist by ID
export function removeFromWishlist(bookId) {
  const list = getWishlist();
  
  // Keep all books except the one with the matching ID
  const updatedList = list.filter((item) => item.id !== Number(bookId));
  localStorage.setItem(KEY, JSON.stringify(updatedList));
  
  return updatedList;
}
