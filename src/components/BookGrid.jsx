import BookCard from './BookCard';

function BookGrid({ books }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>No books found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;