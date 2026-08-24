import { deleteCustomBook } from "../utils/bookManagement";

export default function DeleteBookButton({ bookId, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to remove this book from your collection?"
    );

    if (confirmed) {
      deleteCustomBook(bookId);
      if (onDelete) {
        onDelete(bookId);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="delete-book-btn"
      style={{
        padding: "6px 12px",
        borderRadius: "6px",
        border: "1px solid #fca5a5",
        backgroundColor: "#fef2f2",
        color: "#b91c1c",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.2s ease"
      }}
    >
      <span>🗑</span>
      <span>Delete</span>
    </button>
  );
}