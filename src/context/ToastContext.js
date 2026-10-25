import { createContext } from "react";

// The "shared box" for toast messages.
// Any component can read showToast from it with useContext(ToastContext).
export const ToastContext = createContext(null);
