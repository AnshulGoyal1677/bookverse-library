// src/data/books.js
// This is the single source of "built-in" library books.
// Books added by users through the Add Book page are stored
// separately in localStorage (see utils/bookManagement.js) and
// combined with this list when the catalogue is displayed.

export const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    price: 12.99,
    rating: 4.5,
    description:
      "A classic story of wealth, love and the American Dream, set in the Jazz Age of 1920s New York.",
    coverImage:
      "https://m.media-amazon.com/images/I/81TLiZrasVL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    price: 14.5,
    rating: 4.8,
    description:
      "A powerful coming-of-age story exploring racial injustice in the American South through the eyes of a young girl.",
    coverImage:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1612238791i/56916837.jpg",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    price: 16.2,
    rating: 4.9,
    description:
      "A practical guide to building good habits and breaking bad ones, using small, consistent changes.",
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTDQ2y_83l-be_WRSYyV8ZQC-VKEGt8EMVE00dTvkgLFtn5SyKNvN6XGln&s=10",
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    price: 18.0,
    rating: 4.7,
    description:
      "A sweeping look at how Homo sapiens came to dominate the world, from the Stone Age to the present.",
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7d6gDdh2-PsaxRnh4WPW157ZvZk-thwEFHn28nctluObbYpWH4q3EQwo&s=10",
  },
  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    price: 28.99,
    rating: 4.6,
    description:
      "A guide to writing readable, maintainable software, with practical principles every developer should know.",
    coverImage:
      "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    price: 15.25,
    rating: 4.8,
    description:
      "The tale of Bilbo Baggins, a hobbit who joins a quest to reclaim a treasure guarded by a dragon.",
    coverImage:
      "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg",
  },
];
