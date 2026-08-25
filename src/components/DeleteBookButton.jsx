import { deleteUserBook } from "../utils/bookManagement";

function DeleteBookButton({ bookId, onDeleted }) {
  const handleDelete = () => {
    const confirmed = window.confirm("Remove this book you added?");
    if (!confirmed) return;

    deleteUserBook(bookId);

    if (onDeleted) {
      onDeleted(bookId);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete Book
    </button>
  );
}

export default DeleteBookButton;
