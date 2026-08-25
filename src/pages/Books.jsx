import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookGrid from '../components/BookGrid';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { books } from '../data/books';
import { getUserBooks } from '../utils/bookManagement';
import './Books.css';

function Books() {
  // Read optional ?search= and ?category= from the URL (set by the
  // Home page hero search and category cards) to pre-fill the filters.
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');

  // Combine the built-in books with any books the user has added.
  const allBooks = [...books, ...getUserBooks()];
  const categories = ['All', ...new Set(allBooks.map((book) => book.category))];

  const filteredBooks = allBooks.filter((book) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term);
    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="books-container container">
      <header className="books-header">
        <h1 className="books-title">Explore Our Book Collection</h1>
        <p className="books-subtitle">
          Discover your next favorite read from our curated catalogue.
        </p>
      </header>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main>
        <BookGrid books={filteredBooks} />
      </main>
    </div>
  );
}

export default Books;
