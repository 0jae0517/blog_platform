"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login, signup } from "./actions";
import styles from "./login.module.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="engineer@0_log.com"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <a href="#" className={styles.forgotLink}>
            Forgot?
          </a>
        </div>
        <div className={styles.inputWrapper}>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeButton}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        formAction={login}
        disabled={isPending}
        className={styles.submitBtn}
      >
        Login
      </button>

      <div className={styles.footer}>
        Don't have an account?{" "}
        <button
          formAction={signup}
          className={styles.signupLink}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
