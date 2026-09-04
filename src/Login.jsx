import { useState } from "react";
import "./Login.css";

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      alert("Account created successfully!");
    } else {
      alert("Login successful!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">Bizora</div>

        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>

        <p className="auth-subtitle">
          {isSignup
            ? "Join Bizora and grow your business."
            : "Login to continue to your Bizora account."}
        </p>

        <form onSubmit={handleSubmit}>

          {isSignup && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {isSignup && (
            <div className="input-group">
              <label>Business Name</label>
              <input
                type="text"
                placeholder="Enter your business name"
                required
              />
            </div>
          )}

          <button className="auth-btn" type="submit">
            {isSignup ? "Create Account" : "Login"}
          </button>

        </form>

        <div className="switch-auth">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;