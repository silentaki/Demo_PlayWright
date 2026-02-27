import { useState } from "react";
import { logoutUser } from "./auth";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const initialProducts = [
  { id: 1, name: "Cricket Bat", price: 120, inStock: 1 },
  { id: 2, name: "Cricket Ball", price: 25, inStock: 1 },
  { id: 3, name: "Batting Gloves", price: 45, inStock: 1 },
  { id: 4, name: "Batting Pads", price: 70, inStock: 1 },
  { id: 5, name: "Cricket Helmet", price: 85, inStock: 1 },
  { id: 6, name: "Wicket Stumps Set", price: 60, inStock: 1 },
  { id: 7, name: "Thigh Guard", price: 35, inStock: 1 },
  { id: 8, name: "Arm Guard", price: 30, inStock: 1 },
  { id: 9, name: "Cricket Kit Bag", price: 95, inStock: 1 },
  { id: 10, name: "Abdominal Guard", price: 20, inStock: 1 },
  { id: 11, name: "Grip Tape", price: 12, inStock: 1 },
  { id: 12, name: "Training Cones", price: 18, inStock: 1 },
];

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleStockChange = (id, value) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, inStock: Number(value) }
          : product
      )
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const selectedQuantity = Number(product.inStock);

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        );
      }

      return [...prev, { ...product, quantity: selectedQuantity }];
    });
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
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

      <div className="products-layout">
        <div className="product-grid" data-testid="product-list">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              data-testid="product-card"
            >
              <h3 data-testid="product-name">{product.name}</h3>
              <p data-testid="product-price">${product.price}</p>

              <label
                htmlFor={`stock-${product.id}`}
                className="stock-label"
              >
                In Stock
              </label>
              <select
                id={`stock-${product.id}`}
                value={product.inStock}
                onChange={(e) =>
                  handleStockChange(product.id, e.target.value)
                }
                data-testid="stock-dropdown"
                className="condition-dropdown"
              >
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (quantity) => (
                    <option key={quantity} value={quantity}>
                      {quantity}
                    </option>
                  )
                )}
              </select>

              <div className="product-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                  data-testid={`add-to-cart-${product.id}`}
                >
                  Add to Cart
                </button>
                <button
                  className="buy-now-btn"
                  onClick={() => handleBuyNow(product)}
                  data-testid={`buy-now-${product.id}`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-box" data-testid="cart-box">
          <h3>Add to Cart</h3>
          {cartItems.length === 0 ? (
            <p className="cart-empty" data-testid="cart-empty">
              No items added yet.
            </p>
          ) : (
            <>
              <ul className="cart-list" data-testid="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <span className="cart-item-name">{item.name}</span>
                    <div className="cart-item-actions">
                      <span>x{item.quantity}</span>
                      <button
                        type="button"
                        className="remove-cart-btn"
                        onClick={() => handleRemoveFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        data-testid={`remove-cart-${item.id}`}
                      >
                        x
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="cart-total" data-testid="cart-total">
                Total: ${cartTotal}
              </p>
            </>
          )}
          <button
            type="button"
            className="checkout-btn"
            data-testid="checkout-btn"
            disabled={cartItems.length === 0}
            onClick={() =>
              navigate("/checkout", {
                state: { cartItems, cartTotal },
              })
            }
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Products;
