// src/utils/onlineBooks.js
// Gets books from the free Open Library API (no key needed).
// Each call returns one "page" of books, so the catalogue can ask for page 1,
// then page 2, and so on when the user presses "Load More".

const BOOKS_PER_PAGE = 20;

export async function fetchOnlineBooks(page) {
  const url =
    "https://openlibrary.org/search.json?q=subject:fiction" +
    "&fields=key,title,author_name,cover_i,ratings_average" +
    "&limit=" + BOOKS_PER_PAGE +
    "&page=" + page;

  const response = await fetch(url);

  // fetch only fails on network problems, so we check the status ourselves.
  if (!response.ok) {
    throw new Error("Open Library returned an error");
  }

  const data = await response.json();

  // Keep only books that have a cover photo, and shape them like our own books.
  const booksWithCover = data.docs.filter((doc) => doc.cover_i);

  const books = booksWithCover.map((doc) => {
    const book = {
      id: doc.key, // e.g. "/works/OL123W" - never clashes with our number ids
      title: doc.title,
      author: doc.author_name ? doc.author_name[0] : "Unknown author",
      category: "Fiction",
      // Open Library has no prices, so we make a SAMPLE price between 5.00 and 29.99.
      // It comes from the cover id, so the same book always gets the same price.
      price: 5 + (doc.cover_i % 2500) / 100,
      coverImage: "https://covers.openlibrary.org/b/id/" + doc.cover_i + "-M.jpg",
      isFromApi: true,
      link: "https://openlibrary.org" + doc.key,
    };

    // Not every book has a rating, so we add it only when it exists.
    if (doc.ratings_average) {
      book.rating = Math.round(doc.ratings_average * 10) / 10;
    }

    return book;
  });

  return { books: books, total: data.numFound };
}
