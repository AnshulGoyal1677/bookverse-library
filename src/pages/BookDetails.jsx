import { useParams, Link } from "react-router-dom";
import { booksData } from "../data/booksData";
import WishlistButton from "../components/WishlistButton";

export default function BookDetails() {
  // 1. Get the dynamic book id from the URL parameter (/books/:id)
  const { id } = useParams();

  // 2. Find the book in booksData matching this ID
  const book = booksData.find((item) => item.id === Number(id));

  // 3. Render fallback if ID is not found in booksData
  if (!book) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2>Book Not Found</h2>
        <p style={{ color: "#6b7280" }}>No book found with ID: {id}</p>
        <Link to="/" style={{ color: "#2563eb" }}>← Return to Home</Link>
      </div>
    );
  }

  // 4. Render details using the exact properties from booksData
  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "0 20px" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#4b5563" }}>
        ← Back to Catalogue
      </Link>

      <div style={{ 
        border: "1px solid #e5e7eb", 
        borderRadius: "8px", 
        padding: "24px", 
        marginTop: "16px",
        backgroundColor: "#ffffff"
      }}>
        <span style={{ 
          backgroundColor: "#e0f2fe", 
          color: "#0369a1", 
          padding: "4px 8px", 
          borderRadius: "4px", 
          fontSize: "12px",
          fontWeight: "bold"
        }}>
          {book.category}
        </span>

        <h1 style={{ margin: "12px 0 6px", fontSize: "26px" }}>{book.title}</h1>
        <p style={{ margin: "0 0 16px", color: "#4b5563" }}>by <strong>{book.author}</strong></p>

        <p style={{ fontSize: "14px", color: "#9ca3af" }}>Book ID: #{book.id}</p>

        <div style={{ margin: "20px 0", borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
          <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>Synopsis</h3>
          <p style={{ color: "#374151", lineHeight: "1.5" }}>{book.description}</p>
        </div>

        {/* WishlistButton component integration */}
        <div style={{ marginTop: "20px" }}>
          <WishlistButton book={book} />
        </div>
      </div>
    </div>
  );
}
