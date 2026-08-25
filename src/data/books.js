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
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
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
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
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
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
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
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80",
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
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
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
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80",
  },
];
