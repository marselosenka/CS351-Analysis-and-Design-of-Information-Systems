import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AuthShell from "../components/auth/AuthShell";
import PageMeta from "../components/seo/PageMeta";
import styles from "../styles/AuthForm.module.css";
import { writeAuthUser, readAuthUser, AuthUser } from "../lib/auth";
import { fetchJson } from "../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (readAuthUser()) {
      router.replace("/home");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await fetchJson<{ user?: unknown }>("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (data.user) {
        writeAuthUser(data.user as AuthUser);
        router.push("/home");
        return;
      }

      alert("Invalid credentials");
    } catch (error) {
      alert("Error logging in: " + (error as Error).message);
    }
  };

  return (
    <>
      <PageMeta
        title="Login - eSports System"
        description="Sign in to your eSports System account to manage events and access your profile."
      />
      <AuthShell
        title="WELCOME TO ESPORTS SYSTEM!"
        eyebrow="Login"
        blurb="Watch live events or upload your own content. Connect with creators all over the world."
        footerText="Don't have an account?"
        footerHref="/register"
        footerLabel="Register"
      >
        <form className={styles.form} onSubmit={handleSubmit}>
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
            />
          </div>

          <button type="submit" className={styles.submit}>
            LOGIN
          </button>

          <div className={styles.socialRow} aria-label="Social login">
            <a href="#" className={styles.socialIcon} aria-label="Twitter">
              <Image src="/img/twitter.png" alt="" width={18} height={18} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <Image src="/img/Facebook.png" alt="" width={18} height={18} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Google">
              <Image src="/img/Google.png" alt="" width={18} height={18} />
            </a>
          </div>
        </form>
      </AuthShell>
    </>
  );
}
