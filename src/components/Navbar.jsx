import { Link, NavLink } from 'react-router-dom';

function Navbar({ currentUser }) {
  const linkClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link className="navbar-brand" to="/">
          BookVerse
        </Link>

        <div className="navbar-links">
          <NavLink to="/catalogue" className={linkClass}>
            Catalogue
          </NavLink>
          <NavLink to="/wishlist" className={linkClass}>
            Wishlist
          </NavLink>
          <NavLink to="/add-book" className={linkClass}>
            Add Book
          </NavLink>
        </div>

        <div className="navbar-actions">
          {currentUser ? (
            <Link to="/profile" className="navbar-user">
              Hi, {currentUser.name}
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
