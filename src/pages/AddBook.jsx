import { useState, useContext } from "react";
import FormInput from "../components/FormInput";
import { ToastContext } from "../context/ToastContext";
import { addUserBook } from "../utils/bookManagement";
import "./AddBook.css";

// The form starts (and is reset to) this empty state.
const emptyForm = {
  title: "",
  author: "",
  category: "",
  description: "",
  price: "",
  rating: "",
  coverImage: "",
};

function AddBook({ currentUser }) {
  const { showToast } = useContext(ToastContext);
  const [formData, setFormData] = useState(emptyForm);

  // errors looks like { title: "Title is required.", price: "..." }
  // A field with no problem simply has no entry.
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear the old error for the field the user is now fixing.
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Checks every field and returns an object of error messages.
  const validateForm = () => {
    const newErrors = {};

    if (formData.title.trim() === "") {
      newErrors.title = "Title is required.";
    }

    if (formData.author.trim() === "") {
      newErrors.author = "Author is required.";
    }

    if (formData.category.trim() === "") {
      newErrors.category = "Category is required.";
    }

    // Number inputs still give us text, so we convert with Number().
    const priceText = formData.price.trim();
    if (priceText === "") {
      newErrors.price = "Price is required.";
    } else if (isNaN(Number(priceText))) {
      newErrors.price = "Price must be a number.";
    } else if (Number(priceText) < 0) {
      newErrors.price = "Price cannot be negative.";
    }

    const ratingText = formData.rating.trim();
    if (ratingText === "") {
      newErrors.rating = "Rating is required.";
    } else if (isNaN(Number(ratingText))) {
      newErrors.rating = "Rating must be a number.";
    } else if (Number(ratingText) < 0 || Number(ratingText) > 5) {
      newErrors.rating = "Rating must be between 0 and 5.";
    }

    // The cover image is optional, but if it is typed it should be a web link.
    const coverText = formData.coverImage.trim();
    if (coverText !== "" && !coverText.startsWith("http")) {
      newErrors.coverImage = "Cover image must be a link starting with http.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    // Object.keys(...).length is the number of fields with a problem.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the highlighted fields.", "error");
      return;
    }

    addUserBook({
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category.trim(),
      description: formData.description.trim() || "No description provided.",
      price: Number(formData.price),
      rating: Number(formData.rating),
      coverImage:
        formData.coverImage.trim() ||
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",
      addedBy: currentUser.email, // remembers who added the book
    });

    setFormData(emptyForm);
    setErrors({});
    showToast("Book added successfully!", "success");
  };

  return (
    <div className="container add-book-page">
      <div className="add-book-card">
        <h1>Add a Book</h1>
        <p>Add a new book to the BookVerse catalogue.</p>

        {/* noValidate turns off the browser's own pop-ups so our messages are used */}
        <form className="add-book-form" onSubmit={handleSubmit} noValidate>
          <FormInput
            id="title"
            label="Title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
          />

          <FormInput
            id="author"
            label="Author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            error={errors.author}
          />

          <FormInput
            id="category"
            label="Category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            error={errors.category}
          />

          <div className="form-group">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <FormInput
              id="price"
              label="Price ($)"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
            />

            <FormInput
              id="rating"
              label="Rating (out of 5)"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              error={errors.rating}
            />
          </div>

          <FormInput
            id="coverImage"
            label="Cover Image URL (optional)"
            type="text"
            value={formData.coverImage}
            onChange={handleChange}
            error={errors.coverImage}
          />

          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
