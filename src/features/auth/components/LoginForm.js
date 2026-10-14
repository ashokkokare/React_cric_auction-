import React, { useState } from 'react';
import { login } from '../../../services/authApi';

function LoginForm({ onSignUp, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login({ email, password });
      onLoginSuccess(user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label htmlFor="login-email">Email</label>
      <input id="login-email" type="email" autoComplete="email" value={email}
        onChange={(event) => setEmail(event.target.value)} required maxLength={255} />
      <label htmlFor="login-password">Password</label>
      <input id="login-password" type="password" autoComplete="current-password" value={password}
        onChange={(event) => setPassword(event.target.value)} required />
      {error && <p className="auth-message auth-message--error" role="alert">{error}</p>}
      <button className="auth-form__submit" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Login'}</button>
      <p className="auth-form__footer">Not a member? <button type="button" className="auth-form__link" onClick={onSignUp}>Sign up</button></p>
    </form>
  );
}

export default LoginForm;
