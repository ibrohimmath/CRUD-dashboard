import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "@/context/AuthProvider";
import Login from "@/components/Login";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  if (user) {
    return children;
  } else {
    window.location.href = "/";
    return;
  }
}

export default ProtectedRoute;
