import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Products.css";

const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOrderAlert, setShowOrderAlert] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    country: "United States",
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const cartItems = location.state?.cartItems ?? [];
  const cartTotalFromState = location.state?.cartTotal;

  const cartTotal = useMemo(() => {
    if (typeof cartTotalFromState === "number") {
      return cartTotalFromState;
    }

    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems, cartTotalFromState]);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    setShowOrderAlert(true);
  };

  const handleCardNumberChange = (value) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
    const formattedValue = digitsOnly.replace(
      /(\d{4})(?=\d)/g,
      "$1-"
    );
    setCardDetails((prev) => ({
      ...prev,
      cardNumber: formattedValue,
    }));
  };

  return (
    <div className="products-container" data-testid="checkout-page">
      <div className="checkout-card checkout-layout">
        <h2 data-testid="checkout-title">Checkout Page</h2>
        <p data-testid="checkout-message">
          Review your order and complete your purchase.
        </p>

        <form
          className="checkout-form"
          onSubmit={handlePlaceOrder}
          data-testid="checkout-form"
        >
          <div className="address-grid">
            <div>
              <label className="address-label">
                Shipping Address
              </label>
              <div className="shipping-fields">
                <label htmlFor="shipping-country" className="address-sublabel">
                  Country
                </label>
                <select
                  id="shipping-country"
                  className="address-input"
                  value={shippingAddress.country}
                  onChange={(event) =>
                    setShippingAddress((prev) => ({
                      ...prev,
                      country: event.target.value,
                    }))
                  }
                  required
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </select>

                <label htmlFor="shipping-name" className="address-sublabel">
                  Full Name
                </label>
                <input
                  id="shipping-name"
                  type="text"
                  className="address-input"
                  value={shippingAddress.fullName}
                  onChange={(event) =>
                    setShippingAddress((prev) => ({
                      ...prev,
                      fullName: event.target.value,
                    }))
                  }
                  placeholder="Enter full name"
                  required
                />

                <label htmlFor="shipping-street" className="address-sublabel">
                  Street Address
                </label>
                <input
                  id="shipping-street"
                  type="text"
                  className="address-input"
                  value={shippingAddress.streetAddress}
                  onChange={(event) =>
                    setShippingAddress((prev) => ({
                      ...prev,
                      streetAddress: event.target.value,
                    }))
                  }
                  placeholder="Enter street address"
                  required
                />

                <div className="shipping-location-row">
                  <div>
                    <label
                      htmlFor="shipping-city"
                      className="address-sublabel"
                    >
                      City
                    </label>
                    <input
                      id="shipping-city"
                      type="text"
                      className="address-input"
                      value={shippingAddress.city}
                      onChange={(event) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          city: event.target.value,
                        }))
                      }
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="shipping-state"
                      className="address-sublabel"
                    >
                      State
                    </label>
                    <select
                      id="shipping-state"
                      className="address-input"
                      value={shippingAddress.state}
                      onChange={(event) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          state: event.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select state</option>
                      {usStates.map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="shipping-zipcode"
                      className="address-sublabel"
                    >
                      Zip Code
                    </label>
                    <input
                      id="shipping-zipcode"
                      type="text"
                      className="address-input"
                      value={shippingAddress.zipcode}
                      onChange={(event) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          zipcode: event.target.value,
                        }))
                      }
                      placeholder="Zip code"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="address-label">
                Credit Card Details
              </label>
              <div className="shipping-fields">
                <label htmlFor="card-name" className="address-sublabel">
                  Name On Card
                </label>
                <input
                  id="card-name"
                  type="text"
                  className="address-input"
                  value={cardDetails.nameOnCard}
                  onChange={(event) =>
                    setCardDetails((prev) => ({
                      ...prev,
                      nameOnCard: event.target.value,
                    }))
                  }
                  placeholder="Enter name on card"
                  required
                />

                <label htmlFor="card-number" className="address-sublabel">
                  Card Number
                </label>
                <input
                  id="card-number"
                  type="tel"
                  className="address-input"
                  value={cardDetails.cardNumber}
                  onChange={(event) =>
                    handleCardNumberChange(event.target.value)
                  }
                  placeholder="1234-5678-9012-3456"
                  inputMode="numeric"
                  pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
                  maxLength={19}
                  required
                />

                <div className="payment-row">
                  <div>
                    <label htmlFor="card-expiry" className="address-sublabel">
                      Expiry
                    </label>
                    <input
                      id="card-expiry"
                      type="text"
                      className="address-input"
                      value={cardDetails.expiry}
                      onChange={(event) =>
                        setCardDetails((prev) => ({
                          ...prev,
                          expiry: event.target.value,
                        }))
                      }
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="card-cvv" className="address-sublabel">
                      CVV
                    </label>
                    <input
                      id="card-cvv"
                      type="password"
                      className="address-input"
                      value={cardDetails.cvv}
                      onChange={(event) =>
                        setCardDetails((prev) => ({
                          ...prev,
                          cvv: event.target.value,
                        }))
                      }
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-summary" data-testid="order-summary">
            <h3>Order Summary</h3>
            {cartItems.length === 0 ? (
              <p className="cart-empty">No items in your order.</p>
            ) : (
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <span className="cart-item-name">{item.name}</span>
                    <span>
                      {item.quantity} x ${item.price}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="cart-total">Total: ${cartTotal}</p>
          </div>

          <div className="checkout-actions">
            <button
              type="button"
              className="checkout-back-btn"
              onClick={() => navigate("/products")}
              data-testid="back-to-products-btn"
            >
              Back to Products
            </button>
            <button
              type="submit"
              className="place-order-btn"
              data-testid="place-order-btn"
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </form>
      </div>

      {showOrderAlert ? (
        <div className="order-alert-overlay" data-testid="order-alert">
          <div className="order-alert-box">
            <button
              type="button"
              className="order-alert-close-icon"
              aria-label="Close order alert"
              onClick={() => setShowOrderAlert(false)}
            >
              x
            </button>
            <h3>Order Placed</h3>
            <p>Your order has been placed successfully.</p>
            <button
              type="button"
              className="order-alert-close-btn"
              onClick={() => setShowOrderAlert(false)}
              data-testid="order-alert-close"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CheckoutPage;
