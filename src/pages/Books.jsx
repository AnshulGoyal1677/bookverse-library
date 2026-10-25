import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookGrid from '../components/BookGrid';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { getAllBooks } from '../utils/bookManagement';
import { fetchOnlineBooks } from '../utils/onlineBooks';
import './Books.css';

function Books() {
  // Read optional ?search= and ?category= from the URL (set by the
  // Home page hero search and category cards) to pre-fill the filters.
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortOption, setSortOption] = useState('default');

  // State for the "Load More" button (books from the online API)
  const [onlineBooks, setOnlineBooks] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [totalOnline, setTotalOnline] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const loadMoreBooks = async () => {
    setLoading(true);
    setLoadError('');

    try {
      const result = await fetchOnlineBooks(nextPage);
      setOnlineBooks([...onlineBooks, ...result.books]); // add to the ones we already have
      setTotalOnline(result.total);
      setNextPage(nextPage + 1);
    } catch (error) {
      console.log('Load more failed:', error);
      setLoadError('Could not load more books. Please check your internet and try again.');
    }

    setLoading(false);
  };

  // Built-in books + books the user added (minus deleted ones) + online books.
  const allBooks = [...getAllBooks(), ...onlineBooks];
  const categories = ['All', ...new Set(allBooks.map((book) => book.category))];

  const filteredBooks = allBooks.filter((book) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term);
    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort a COPY of the filtered list, so the original arrays are never changed.
  const sortedBooks = [...filteredBooks];

  if (sortOption === 'title-asc') {
    sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'price-low') {
    sortedBooks.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high') {
    sortedBooks.sort((a, b) => b.price - a.price);
  }
  // 'default' keeps the original order

  // Choose the text on the button
  let buttonText = 'Load More Books';
  if (loading) {
    buttonText = 'Loading...';
  } else if (loadError) {
    buttonText = 'Try Again';
  }

  return (
    <div className="books-container container">
      <header className="books-header">
        <h1 className="books-title">Explore Our Book Collection</h1>
        <p className="books-subtitle">
          Discover your next favorite read from our curated catalogue.
        </p>
      </header>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          className="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default order</option>
          <option value="title-asc">Title: A–Z</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main>
        <BookGrid books={sortedBooks} />
      </main>

      <div className="load-more-container">
        {loadError && <p className="load-error">{loadError}</p>}

        <button className="btn btn-primary" onClick={loadMoreBooks} disabled={loading}>
          {buttonText}
        </button>

        {totalOnline > 0 && (
          <p className="load-more-note">
            {onlineBooks.length} online books loaded from {totalOnline.toLocaleString()} available.
            Search, category and sort work on the books loaded so far.
          </p>
        )}
      </div>
    </div>
  );
}

export default Books;
