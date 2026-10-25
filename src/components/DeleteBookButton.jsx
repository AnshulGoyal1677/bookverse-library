import { useState } from "react";
import { deleteBook } from "../utils/bookManagement";
import "./DeleteBookButton.css";

function DeleteBookButton({ book, onDeleted }) {
  // true while the "Are you sure?" box is open
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = () => {
    deleteBook(book);
    setShowConfirm(false);

    if (onDeleted) {
      onDeleted(book.id);
    }
  };

  return (
    <>
      <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>
        Delete Book
      </button>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Delete this book?</h3>
            <p>This book will be removed from the catalogue. This cannot be undone.</p>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteBookButton;
