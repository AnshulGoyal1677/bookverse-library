const KEY = "bookverse_custom_books";

// 1. Get all custom books from localStorage
export function getCustomBooks() {
  const data = localStorage.getItem(KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

// 2. Add a new custom book to localStorage
export function addCustomBook(book) {
  const currentBooks = getCustomBooks();

  // Create a new book object with a unique timestamp ID
  const newBook = {
    id: Date.now(),
    title: book.title,
    author: book.author,
    category: book.category,
    description: book.description,
    isCustom: true
  };

  // Add new book to the array and save
  const updatedBooks = [newBook, ...currentBooks];
  localStorage.setItem(KEY, JSON.stringify(updatedBooks));

  return newBook;
}

// 3. Delete a custom book by its ID
export function deleteCustomBook(bookId) {
  const currentBooks = getCustomBooks();

  // Filter out the book with matching ID
  const updatedBooks = currentBooks.filter((item) => item.id !== Number(bookId));
  localStorage.setItem(KEY, JSON.stringify(updatedBooks));

  return updatedBooks;
}
