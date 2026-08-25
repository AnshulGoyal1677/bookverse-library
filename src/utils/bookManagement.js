// src/utils/bookManagement.js
// Helper functions for books that the logged-in user adds themselves.
// These are stored separately from the built-in books.js list so we
// never accidentally overwrite the starter catalogue.

const USER_BOOKS_KEY = "bookverse_user_books";

export function getUserBooks() {
  const saved = localStorage.getItem(USER_BOOKS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function addUserBook(book) {
  const userBooks = getUserBooks();

  const newBook = {
    ...book,
    id: Date.now(), // simple unique id based on current time
    isUserAdded: true,
  };

  userBooks.push(newBook);
  localStorage.setItem(USER_BOOKS_KEY, JSON.stringify(userBooks));

  return newBook;
}

export function deleteUserBook(bookId) {
  const userBooks = getUserBooks().filter((book) => book.id !== bookId);
  localStorage.setItem(USER_BOOKS_KEY, JSON.stringify(userBooks));
}
