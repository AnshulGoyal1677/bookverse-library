import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Wishlist from './pages/Wishlist';
import AddBook from './pages/AddBook';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  // The logged-in user is kept here (in the top-level App component) and
  // passed down as a prop to whichever page needs it. This is "lifting
  // state up" so Navbar, Login and Profile can all share the same value.
  const [currentUser, setCurrentUser] = useState(() => {
    const savedSession = localStorage.getItem('bookverse_session');
    return savedSession ? JSON.parse(savedSession) : null;
  });

  return (
    <div className="app-layout">
      <Navbar currentUser={currentUser} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/add-book"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
