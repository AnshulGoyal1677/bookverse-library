import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addCustomBook } from "../utils/bookManagement";

export default function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    description: ""
  });

  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim()) {
      setError("Please fill in both the Title and Author fields.");
      return;
    }

    setError("");
    addCustomBook({
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      description: formData.description.trim() || "No description provided."
    });

    setIsSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#4b5563",
          textDecoration: "none",
          fontWeight: "500"
        }}
      >
        ← Back to Catalogue
      </Link>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb"
        }}
      >
        <h1 style={{ fontSize: "24px", color: "#111827", marginBottom: "8px" }}>
          Add a New Book
        </h1>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>
          Add a custom book to your personal collection.
        </p>

        {error && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "6px",
              marginBottom: "16px",
              fontSize: "14px"
            }}
          >
            {error}
          </div>
        )}

        {isSuccess && (
          <div
            style={{
              padding: "12px",
              backgroundColor: "#dcfce7",
              color: "#15803d",
              borderRadius: "6px",
              marginBottom: "16px",
              fontSize: "14px"
            }}
          >
            Book added successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              htmlFor="title"
              style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}
            >
              Book Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Clean Code"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label
              htmlFor="author"
              style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}
            >
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. Robert C. Martin"
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#ffffff",
                boxSizing: "border-box"
              }}
            >
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="Poetry">Poetry</option>
              <option value="History">History</option>
              <option value="Technology">Technology</option>
              <option value="Philosophy">Philosophy</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" }}
            >
              Description / Synopsis
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Brief summary of the book..."
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                resize: "vertical"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "8px"
            }}
          >
            Save Book
          </button>
        </form>
      </div>
    </div>
  );
}