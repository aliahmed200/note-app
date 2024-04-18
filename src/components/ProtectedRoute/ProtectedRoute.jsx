import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.jsx";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);
  if (token) {
    return children;
  }

  return <Navigate to="/login" />;
}
