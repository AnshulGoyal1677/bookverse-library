import { useState } from "react";
import { addCustomBook } from "../utils/bookManagement";

export default function AddBook() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || author.trim() === "") {
      setError("Please fill in both Title and Author.");
      return;
    }

    setError("");

    addCustomBook({
      title: title.trim(),
      author: author.trim(),
      category: category,
      description: description.trim() || "No description provided."
    });

    setSuccess(true);

    setTimeout(() => {
      window.location.href = "/";
    }, 1200);
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px"
    }}>

      <a
        href="/"
        style={{
          textDecoration: "none",
          color: "#4b5563"
        }}
      >
        ← Back to Catalogue
      </a>

      <div style={{
        backgroundColor: "white",
        padding: "30px",
        marginTop: "20px",
        borderRadius: "12px",
        border: "1px solid #ddd"
      }}>

        <h1>Add a New Book</h1>

        <p>Add a custom book to your collection.</p>

        {error !== "" && (
          <div style={{
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            padding: "10px",
            marginBottom: "15px"
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: "#dcfce7",
            color: "#15803d",
            padding: "10px",
            marginBottom: "15px"
          }}>
            Book added successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>Book Title *</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0 15px",
              boxSizing: "border-box"
            }}
          />

          <label>Author *</label>

          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0 15px",
              boxSizing: "border-box"
            }}
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0 15px"
            }}
          >
            <option>Fiction</option>
            <option>Science</option>
            <option>Poetry</option>
            <option>History</option>
            <option>Technology</option>
            <option>Philosophy</option>
          </select>

          <label>Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0 15px",
              boxSizing: "border-box"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Save Book
          </button>

        </form>
      </div>
    </div>
  );
}
