import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user) {
    return children;
  } else {
    window.location.href = "/";
    return;
  }
}

export default ProtectedRoute;
