import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { getAllBooks, getUserBooks } from "../utils/bookManagement";
import { getWishlist } from "../utils/wishlist";
import "./Profile.css";

function Profile({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("bookverse_session");
    setCurrentUser(null);
    navigate("/");
  };

  // Dashboard numbers are worked out from the real saved data.
  const userBooks = getUserBooks();
  const allBooks = getAllBooks();
  const wishlistIds = getWishlist(); // this user's own wishlist

  // Only count wishlist ids that still match a book (a deleted book is skipped).
  const wishlistCount = allBooks.filter((book) => wishlistIds.includes(book.id)).length;
  const myBooksCount = userBooks.filter((book) => book.addedBy === currentUser.email).length;

  return (
    <div className="container profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        <p className="profile-field">
          <strong>Name:</strong> {currentUser.name}
        </p>
        <p className="profile-field">
          <strong>Email:</strong> {currentUser.email}
        </p>

        <h2 className="dashboard-title">My Reading Dashboard</h2>
        <div className="stats-grid">
          <StatCard label="Books in catalogue" value={allBooks.length} />
          <StatCard label="In my wishlist" value={wishlistCount} />
          <StatCard label="Added by me" value={myBooksCount} />
        </div>

        <button className="btn btn-outline" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
