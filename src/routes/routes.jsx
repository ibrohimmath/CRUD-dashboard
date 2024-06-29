import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "@/components/Login";

function Router() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
      ])}
    />
  );
}

export default Router;
