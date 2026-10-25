import { useEffect } from "react";
import "./Toast.css";

// A small message box shown at the bottom-right of the screen.
// type is "success" or "error" and only changes the colour.
function Toast({ message, type, onClose }) {
  // Hide the toast automatically after 3 seconds.
  // The cleanup function stops the timer if the toast disappears earlier.
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className={`toast toast-${type}`} role="status">
      <span>{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close message">
        ×
      </button>
    </div>
  );
}

export default Toast;
