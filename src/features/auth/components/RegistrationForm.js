import React, { useState } from 'react';
import { signup } from '../../../services/authApi';

function RegistrationForm({ onSignupSuccess }) {
  const [details, setDetails] = useState({ name: '', mobileNumber: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function update(field) {
    return (event) => setDetails((current) => ({ ...current, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await signup(details);
      onSignupSuccess(user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Create account</h2>
      <label htmlFor="signup-name">Name</label>
      <input id="signup-name" type="text" autoComplete="name" value={details.name}
        onChange={update('name')} required maxLength={100} />
      <label htmlFor="signup-mobile">Mobile number <span>(optional)</span></label>
      <input id="signup-mobile" type="tel" autoComplete="tel" inputMode="numeric" value={details.mobileNumber}
        onChange={update('mobileNumber')} pattern="[0-9]{10}" maxLength={10} />
      <label htmlFor="signup-email">Email</label>
      <input id="signup-email" type="email" autoComplete="email" value={details.email}
        onChange={update('email')} required maxLength={255} />
      <label htmlFor="signup-password">Password</label>
      <input id="signup-password" type="password" autoComplete="new-password" value={details.password}
        onChange={update('password')} required minLength={12} maxLength={72} />
      <small className="auth-form__hint">Use at least 12 characters.</small>
      {error && <p className="auth-message auth-message--error" role="alert">{error}</p>}
      <button className="auth-form__submit" type="submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Sign up'}</button>
    </form>
  );
}

export default RegistrationForm;
