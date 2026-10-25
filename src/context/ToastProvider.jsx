import { useState } from "react";
import { ToastContext } from "./ToastContext";
import Toast from "../components/Toast";

// Wraps the whole app (see main.jsx). It owns the toast state, so any
// component inside can show a toast without props being passed down.
function ToastProvider({ children }) {
  const [toast, setToast] = useState(null); // null = nothing to show

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
