import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Products from "./Products";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutPage from "./CheckoutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
