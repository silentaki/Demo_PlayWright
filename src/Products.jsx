import { useState } from "react";
import { logoutUser } from "./auth";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const initialProducts = [
  { id: 1, name: "Laptop", price: 1200, condition: "New" },
  { id: 2, name: "Headphones", price: 150, condition: "New" },
  { id: 3, name: "Smartphone", price: 900, condition: "New" },
  { id: 4, name: "Keyboard", price: 80, condition: "New" },
];

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleConditionChange = (id, value) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, condition: value }
          : product
      )
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-container" data-testid="products-page">
      <button
        className="logout-btn"
        data-testid="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>

      <h2 data-testid="products-title">Products</h2>

      <input
        className="search-bar"
        data-testid="search-input"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="product-grid" data-testid="product-list">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            data-testid="product-card"
          >
            <h3 data-testid="product-name">{product.name}</h3>
            <p data-testid="product-price">${product.price}</p>

            <select
              value={product.condition}
              onChange={(e) =>
                handleConditionChange(product.id, e.target.value)
              }
              data-testid="condition-dropdown"
              className="condition-dropdown"
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
