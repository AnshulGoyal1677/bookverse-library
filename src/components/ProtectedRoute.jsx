import { Navigate } from "react-router-dom";

// Wrap a page with this component to require login before viewing it.
// Example: <ProtectedRoute currentUser={currentUser}><Profile /></ProtectedRoute>
function ProtectedRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
