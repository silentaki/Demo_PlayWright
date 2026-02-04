import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { loginUser } from "./auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@test.com" && password === "Swordsman12@") {
      loginUser();
      navigate("/products");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container" data-testid="login-page">
      <div className="login-card">
        <h2 data-testid="login-title">Market Place</h2>

        <form onSubmit={handleSubmit} data-testid="login-form">
          <input
            data-testid="email-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            data-testid="password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div data-testid="recaptcha-box">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={() => setCaptchaVerified(true)}
            />
          </div>

          <button
            data-testid="login-button"
            type="submit"
            disabled={!captchaVerified}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
