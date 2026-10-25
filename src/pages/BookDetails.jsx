import { useContext, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAllBooks } from "../utils/bookManagement";
import { getBookReviews, saveReview } from "../utils/reviews";
import { ToastContext } from "../context/ToastContext";
import { useReading } from "../context/ReadingContext";
import WishlistButton from "../components/WishlistButton";
import DeleteBookButton from "../components/DeleteBookButton";
import "./BookDetails.css";

function BookDetails() {
  const { showToast } = useContext(ToastContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReadingItem, addToReadingList, removeFromReadingList } = useReading();
  const [rating, setRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewRefresh, setReviewRefresh] = useState(0);

  const bookId = Number(id);
  const allBooks = getAllBooks();
  const book = allBooks.find((b) => b.id === bookId);

  const reviews = useMemo(() => {
    // Newest reviews first. reviewRefresh updates the list after a review is submitted.
    return [...getBookReviews(bookId)].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [bookId, reviewRefresh]);

  if (!book) {
    return (
      <div className="container book-details-page">
        <p>Sorry, we couldn't find that book.</p>
        <Link to="/catalogue" className="btn btn-outline">Back to Catalogue</Link>
      </div>
    );
  }

  const allBookReviews = getBookReviews(bookId);
  const averageRating = allBookReviews.length
    ? (allBookReviews.reduce((total, review) => total + review.rating, 0) / allBookReviews.length).toFixed(1)
    : null;
  const readingItem = getReadingItem(book.id);

  const handleDeleted = () => {
    showToast("Book deleted successfully.", "success");
    navigate("/catalogue");
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const text = reviewText.trim();
    if (!text) {
      setReviewError("Please write a review before submitting.");
      return;
    }
    if (text.length < 5) {
      setReviewError("Your review must be at least 5 characters.");
      return;
    }

    try {
      saveReview({
        bookId: book.id,
        bookTitle: book.title,
        name: "Reader",
        rating: Number(rating),
        text,
      });
      setReviewText("");
      setReviewError("");
      setReviewRefresh((count) => count + 1);
      showToast("Review submitted.", "success");
    } catch (error) {
      setReviewError(error.message || "Could not save your review. Please try again.");
    }
  };

  const handleReadingList = () => {
    if (readingItem) {
      removeFromReadingList(book.id);
      showToast("Removed from your reading list.", "success");
    } else {
      addToReadingList(book);
      showToast("Added to your reading list.", "success");
    }
  };

  return (
    <div className="container book-details-page">
      <Link to="/catalogue" className="back-link">← Back to Catalogue</Link>

      <div className="book-details-card">
        <img src={book.coverImage} alt={book.title} className="book-details-image" />
        <div className="book-details-info">
          <span className="book-card-category">{book.category}</span>
          <h1>{book.title}</h1>
          <p className="book-details-author">by {book.author}</p>
          <div className="book-details-meta">
            <span className="book-card-rating">
              ⭐ {averageRating ? `${averageRating} / 5 (${allBookReviews.length} review${allBookReviews.length === 1 ? "" : "s"})` : "No reader ratings yet"}
            </span>
            <span className="book-card-price">${Number(book.price || 0).toFixed(2)}</span>
          </div>
          <p className="book-details-description">{book.description}</p>
          <div className="book-details-actions">
            <WishlistButton bookId={book.id} />
            <button type="button" className="btn btn-outline" onClick={handleReadingList}>
              {readingItem ? "Remove from Reading List" : "Add to Reading List"}
            </button>
            <DeleteBookButton book={book} onDeleted={handleDeleted} />
          </div>
        </div>
      </div>

      <section className="book-reviews-section">
        <h2>Rate and Review This Book</h2>
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <div className="form-group">
            <label htmlFor="review-rating">Your rating</label>
            <select id="review-rating" value={rating} onChange={(event) => setRating(event.target.value)}>
              <option value="5">★★★★★ - 5 stars</option>
              <option value="4">★★★★☆ - 4 stars</option>
              <option value="3">★★★☆☆ - 3 stars</option>
              <option value="2">★★☆☆☆ - 2 stars</option>
              <option value="1">★☆☆☆☆ - 1 star</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="review-text">Your review</label>
            <textarea
              id="review-text"
              rows="4"
              maxLength="1000"
              placeholder="What did you think about this book?"
              value={reviewText}
              onChange={(event) => {
                setReviewText(event.target.value);
                setReviewError("");
              }}
            />
          </div>
          {reviewError && <p className="review-error">{reviewError}</p>}
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review this book.</p>
          ) : reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-card-heading">
                <strong>{review.name}</strong>
                <span aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
              </div>
              <p>{review.text}</p>
              <small>{new Date(review.date).toLocaleDateString()}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookDetails;
