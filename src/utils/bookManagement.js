// src/utils/bookManagement.js
// Helper functions for books that the logged-in user adds themselves.
// These are stored separately from the built-in books.js list so we
// never accidentally overwrite the starter catalogue.

import { books } from "../data/books";

const USER_BOOKS_KEY = "bookverse_user_books";
const DELETED_IDS_KEY = "bookverse_deleted_book_ids";

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

// Ids of built-in books the user has deleted, e.g. [1, 4]
function getDeletedBookIds() {
  const saved = localStorage.getItem(DELETED_IDS_KEY);
  return saved ? JSON.parse(saved) : [];
}

// Delete ANY book. books.js is a fixed file, so for built-in books we
// remember their id and hide them instead of removing them from the file.
export function deleteBook(book) {
  if (book.isUserAdded) {
    deleteUserBook(book.id);
  } else {
    const deletedIds = getDeletedBookIds();
    deletedIds.push(book.id);
    localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(deletedIds));
  }
}

// Built-in books + user-added books, without the ones that were deleted.
export function getAllBooks() {
  const deletedIds = getDeletedBookIds();
  const allBooks = [...books, ...getUserBooks()];
  return allBooks.filter((book) => !deletedIds.includes(book.id));
}
