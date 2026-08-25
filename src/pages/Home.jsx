import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { books } from '../data/books';
import BookCard from '../components/BookCard';
import './Home.css';

const categories = ['Fiction', 'History', 'Self-Help', 'Technology', 'Fantasy'];

function Home() {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');

  const newArrivals = books.slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/catalogue?search=${encodeURIComponent(heroSearch)}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/catalogue?category=${encodeURIComponent(category)}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero container">
        <h1>Your journey through a thousand verses begins here.</h1>
        <p>
          Discover a curated sanctuary of literature. Search for your next great read
          in our digital library.
        </p>

        <form className="hero-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search by title, author, or keyword..."
            value={heroSearch}
            onChange={(e) => setHeroSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </section>

      {/* New Arrivals */}
      <section className="container home-section">
        <div className="section-heading">
          <div>
            <h2>New Arrivals</h2>
            <p>The latest additions to our curated shelves.</p>
          </div>
          <Link to="/catalogue" className="view-all-link">
            View all →
          </Link>
        </div>

        <div className="book-grid">
          {newArrivals.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Category Exploration */}
      <section className="container home-section">
        <div className="section-heading">
          <div>
            <h2>Explore by Category</h2>
            <p>Delve into specific realms of knowledge and imagination.</p>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
