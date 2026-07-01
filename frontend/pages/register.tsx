import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthShell from "../components/auth/AuthShell";
import PageMeta from "../components/seo/PageMeta";
import styles from "../styles/AuthForm.module.css";
import { fetchJson } from "../lib/api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("subscriber");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchJson("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastName,
          username,
          email,
          password,
          role,
        }),
      });

      router.push("/login");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <>
      <PageMeta
        title="Register - eSports System"
        description="Create an eSports System account to follow creators, subscribe to events, and publish content."
      />
      <AuthShell
        title="JOIN THE ESPORTS SYSTEM!"
        eyebrow="Register"
        blurb="Sign up to create content or follow your favorite creators. Engage with the eSports world today."
        footerText="Already have an account?"
        footerHref="/login"
        footerLabel="Login"
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              First Name
            </label>
            <input
              id="name"
              className={styles.input}
              type="text"
              placeholder="Enter your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              className={styles.input}
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className={styles.input}
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="role">
              Role
            </label>
            <select
              id="role"
              className={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="subscriber">Subscriber</option>
              <option value="creator">Content Creator</option>
            </select>
          </div>

          <button type="submit" className={styles.submit}>
            REGISTER
          </button>
        </form>
      </AuthShell>
    </>
  );
}
