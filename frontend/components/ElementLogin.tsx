import React, { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy auth ? replace with real API call
    if (username === "admin" && password === "admin") {
      router.push("/home"); // Redirect after login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="element-login">
      <div className="image-container">
        <img src="/img/Background.png" alt="Background" className="background-img" />
        <div className="overlay-text">
          <h2>WELCOME TO ESPORTS SYSTEM!</h2>
          <p>
            Watch live events or upload your own content!<br />
            Connect with creators all over the world!
          </p>
        </div>
      </div>

      <div className="form-container">
        <h1 className="title">eSports System</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-button">LOGIN</button>
        </form>

        <div className="register">
          Don&apos;t have an account? <a href="#">Register</a>
        </div>

        <div className="social-icons">
          <a href="#" aria-label="Twitter">
            <img src="/img/twitter.png" alt="Twitter" />
          </a>
          <a href="#" aria-label="Facebook">
            <img src="/img/Facebook.png" alt="Facebook" />
          </a>
          <a href="#" aria-label="Google">
            <img src="/img/Google.png" alt="Google" />
          </a>
        </div>
      </div>
    </div>
  );
}