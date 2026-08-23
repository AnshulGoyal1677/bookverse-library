import { useParams, Link } from "react-router-dom";
import { booksData } from "../data/booksData";
import WishlistButton from "../components/WishlistButton";

export default function BookDetails() {
  const { id } = useParams();

  // Find the specific book by matching ID from URL
  const book = booksData.find((item) => item.id === Number(id));

  // If the book is not found (e.g., invalid ID entered in URL)
  if (!book) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h2>Book Not Found</h2>
        <p style={{ color: "#6b7280", margin: "12px 0 24px" }}>
          We couldn't find the book you were looking for.
        </p>
        <Link
          to="/"
          style={{
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "6px"
          }}
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "24px",
          color: "#4b5563",
          textDecoration: "none",
          fontWeight: "500"
        }}
      >
        ← Back to Catalogue
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "32px",
          backgroundColor: "#ffffff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
      >
        {/* Book Cover Placeholder / Graphic */}
        <div
          style={{
            height: "320px",
            backgroundColor: "#1e293b",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
            color: "#ffffff"
          }}
        >
          <span
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              opacity: 0.7
            }}
          >
            {book.category}
          </span>
          <h3 style={{ margin: "16px 0 8px", fontSize: "18px" }}>{book.title}</h3>
          <p style={{ fontSize: "14px", opacity: 0.8 }}>by {book.author}</p>
        </div>

        {/* Book Info & Actions */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span
                style={{
                  backgroundColor: "#e0f2fe",
                  color: "#0369a1",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: "600"
                }}
              >
                {book.category}
              </span>
              <span style={{ color: "#9ca3af", fontSize: "14px" }}>Book ID: #{book.id}</span>
            </div>

            <h1 style={{ fontSize: "28px", color: "#111827", margin: "8px 0" }}>
              {book.title}
            </h1>
            <p style={{ fontSize: "16px", color: "#4b5563", marginBottom: "20px" }}>
              Written by <strong>{book.author}</strong>
            </p>

            <h3 style={{ fontSize: "16px", color: "#374151", marginBottom: "8px" }}>
              Synopsis
            </h3>
            <p style={{ color: "#4b5563", lineHeight: "1.6", fontSize: "15px" }}>
              {book.description}
            </p>
          </div>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
            <WishlistButton book={book} />
          </div>
        </div>
      </div>
    </div>
  );
}