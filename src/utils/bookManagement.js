const CUSTOM_BOOKS_KEY = "bookverse_custom_books";

// 1. Retrieve all custom books added by the user
export function getCustomBooks() {
  const saved = localStorage.getItem(CUSTOM_BOOKS_KEY);
  if (!saved) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Error reading custom books:", error);
    return [];
  }
}

// 2. Add a new book to the user's custom collection
export function addCustomBook(book) {
  const books = getCustomBooks();
  
  // Assign a unique timestamp ID if an ID is not provided
  const newBook = {
    ...book,
    id: book.id || Date.now(),
    isCustom: true
  };

  const updated = [newBook, ...books];
  localStorage.setItem(CUSTOM_BOOKS_KEY, JSON.stringify(updated));
  return newBook;
}

// 3. Remove a custom book by ID
export function deleteCustomBook(bookId) {
  const books = getCustomBooks();
  const updated = books.filter((book) => book.id !== Number(bookId));
  localStorage.setItem(CUSTOM_BOOKS_KEY, JSON.stringify(updated));
  return updated;
}