import { useState, useEffect } from 'react';
import styles from './Welcome.module.css'; // Reuse Welcome styles for consistency

const SESSION_KEY = 'beach-eats-auth';

export default function PasswordGate({ children, password }) {
  const [inputPassword, setInputPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Check session storage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === password) {
      setIsAuthenticated(true);
    }
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputPassword === password) {
      sessionStorage.setItem(SESSION_KEY, password);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setInputPassword('');
    }
  };

  // If authenticated, render protected content
  if (isAuthenticated) {
    return children;
  }

  // Otherwise, show password prompt
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Protected Access</h1>
          <p className={styles.subtitle}>Enter password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className={styles.input}
              placeholder="Enter password"
              autoFocus
              required
            />
          </div>

          {error && (
            <div style={{
              color: 'var(--color-error, #e53e3e)',
              fontSize: '14px',
              marginTop: '8px'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className={styles.button}>
            Access
          </button>
        </form>
      </div>
    </div>
  );
}
