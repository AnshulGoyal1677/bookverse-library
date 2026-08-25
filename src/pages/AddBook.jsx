import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserBook } from "../utils/bookManagement";
import "./AddBook.css";

function AddBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    price: "",
    rating: "",
    coverImage: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim() || !formData.category.trim()) {
      setError("Please fill in at least the title, author and category.");
      return;
    }

    addUserBook({
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category.trim(),
      description: formData.description.trim() || "No description provided.",
      price: Number(formData.price) || 0,
      rating: Number(formData.rating) || 0,
      coverImage:
        formData.coverImage.trim() ||
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",
    });

    navigate("/catalogue");
  };

  return (
    <div className="container add-book-page">
      <div className="add-book-card">
        <h1>Add a Book</h1>
        <p>Add a new book to the BookVerse catalogue.</p>

        {error && <div className="auth-alert error-alert">{error}</div>}

        <form className="add-book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" value={formData.title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input id="author" type="text" value={formData.author} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input id="category" type="text" value={formData.category} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input id="price" type="number" step="0.01" value={formData.price} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (out of 5)</label>
              <input id="rating" type="number" step="0.1" max="5" value={formData.rating} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="coverImage">Cover Image URL (optional)</label>
            <input id="coverImage" type="text" value={formData.coverImage} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
