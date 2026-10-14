import React, { useEffect, useState } from 'react';
import './AuthForm.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function AuthForm({ initialView = 'login', onClose, onAuthenticated }) {
  const [isLogin, setIsLogin] = useState(initialView !== 'signup');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    document.querySelector('.auth-page--dialog .auth-form input')?.focus();
  }, [isLogin]);

  return (
    <main
      className="auth-page auth-page--dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose?.();
      }}
    >
      <section className="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button type="button" className="auth-card__close" aria-label="Close sign in" onClick={onClose}>×</button>
        <h1 id="auth-title" className="auth-card__title">Cricauction</h1>
        <div className="auth-tabs" aria-label="Account access">
          <button
            type="button"
            className={`auth-tabs__button${isLogin ? ' is-active' : ''}`}
            aria-pressed={isLogin}
            onClick={() => { setNotice(''); setIsLogin(true); }}
          >
            Login
          </button>
          <button
            type="button"
            className={`auth-tabs__button${!isLogin ? ' is-active' : ''}`}
            aria-pressed={!isLogin}
            onClick={() => { setNotice(''); setIsLogin(false); }}
          >
            Sign up
          </button>
        </div>
        {notice && <p className="auth-message auth-message--success" role="status">{notice}</p>}
        {isLogin
          ? <LoginForm
              onSignUp={() => { setNotice(''); setIsLogin(false); }}
              onLoginSuccess={onAuthenticated}
            />
          : <RegistrationForm onSignupSuccess={(createdUser) => {
              setNotice(`Account created for ${createdUser.email}. Please sign in.`);
              setIsLogin(true);
            }} />}
      </section>
    </main>
  );
}

export default AuthForm;
