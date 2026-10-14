import { useState } from 'react';
import AuthForm from '../auth/AuthForm';
import './LandingPage.css';

const plans = [
  {
    name: 'Starter',
    price: '₹0',
    cadence: 'to run your first auction',
    description: 'A clear, simple start for a small group.',
    features: ['One auction workspace', 'Player list and team purse', 'Live bid tracking'],
    action: 'Start for free',
  },
  {
    name: 'Club',
    price: '₹999',
    cadence: 'per season',
    description: 'More control for clubs running a full season.',
    features: ['Everything in Starter', 'Saved squads and auction history', 'Shareable team summaries'],
    action: 'Choose Club',
    featured: true,
  },
  {
    name: 'League',
    price: 'Custom',
    cadence: 'for multi-team competitions',
    description: 'A setup shaped around your tournament.',
    features: ['Multiple teams and auction rounds', 'League-specific purse rules', 'Setup support'],
    action: 'Set up your league',
  },
];

function BrandMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="brand-mark">
      <rect x="1" y="1" width="38" height="38" rx="12" fill="currentColor" />
      <path d="M12 26 26 12M13 14l13 13" stroke="#c9f36a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="27" cy="13" r="3" fill="#f4fbeb" />
    </svg>
  );
}

function AuctionBoard() {
  return (
    <div className="auction-board" aria-label="Illustration of a live player auction and team purse">
      <div className="auction-board__topline">
        <span className="auction-board__live"><i /> AUCTION ROOM</span>
        <span className="auction-board__round">ROUND 02 / 05</span>
      </div>
      <div className="auction-board__player">
        <div className="player-avatar" aria-hidden="true">AR</div>
        <div>
          <span className="auction-board__label">CURRENT PLAYER</span>
          <h2>Arjun Rao</h2>
          <p>All-rounder <span>·</span> Right hand bat</p>
        </div>
        <div className="auction-board__bid">
          <span className="auction-board__label">CURRENT BID</span>
          <strong>₹ 8.5L</strong>
        </div>
      </div>
      <div className="auction-board__bidder">
        <span className="bidder-dot">T</span>
        <span>Tigers are leading</span>
        <span className="bidder-time">00:18</span>
      </div>
      <div className="purse-panel">
        <div className="purse-panel__heading">
          <div><span className="auction-board__label">TEAM PURSE</span><strong>Falcons</strong></div>
          <span className="purse-panel__remaining">₹ 42.5L left</span>
        </div>
        <div className="purse-meter"><span /></div>
        <div className="purse-panel__foot"><span>₹ 57.5L spent</span><span>8 / 15 players</span></div>
      </div>
      <div className="auction-board__foot"><span>Squad balance</span><span className="balance-indicator">ON TRACK</span></div>
    </div>
  );
}

function LandingPage({ user, sessionReady, onAuthenticated, onLogout }) {
  const [authView, setAuthView] = useState(null);
  const [logoutPending, setLogoutPending] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  function openAuth(view) {
    setAuthView(view);
  }

  async function handleLogout() {
    setLogoutPending(true);
    setLogoutError('');
    try {
      await onLogout();
    } catch (error) {
      setLogoutError(error.message || 'Unable to sign out. Please try again.');
    } finally {
      setLogoutPending(false);
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-container site-header__inner">
          <a className="brand" href="#top" aria-label="Cricauction home">
            <BrandMark /><span>Cric<span className="brand__accent">auction</span></span>
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            <a href="#platform">Platform</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Plans</a>
          </nav>
          <div className="site-header__actions">
            {user ? (
              <>
                <span className="header-user">Hi, {user.name.split(' ')[0]}</span>
                <button className="button button--outline button--small" onClick={handleLogout} disabled={logoutPending}>
                  {logoutPending ? 'Signing out…' : 'Log out'}
                </button>
              </>
            ) : (
              <>
                <button className="button button--quiet" onClick={() => openAuth('login')} disabled={!sessionReady}>Log in</button>
                <button className="button button--dark button--small" onClick={() => openAuth('signup')} disabled={!sessionReady}>Get started <span aria-hidden="true">↗</span></button>
              </>
            )}
          </div>
        </div>
        {logoutError && <p className="site-header__error" role="alert">{logoutError}</p>}
      </header>

      <main>
        <section className="hero site-container" id="top">
          <div className="hero__copy">
            <p className="eyebrow"><span className="eyebrow__line" /> THE AUCTION DESK FOR EVERY TEAM</p>
            <h1>Big bids.<br />Clear budgets.<br /><em>Complete squads.</em></h1>
            <p className="hero__description">Run player auctions with a steady hand. Track every bid, protect your team purse, and leave the room with a squad that makes sense.</p>
            <div className="hero__actions">
              <button className="button button--lime" onClick={() => openAuth(user ? 'login' : 'signup')}>
                {user ? 'Plan your next auction' : 'Create your auction'} <span aria-hidden="true">↗</span>
              </button>
              <a className="text-link" href="#platform">See how it works <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero__proof"><span className="proof-avatars" aria-hidden="true"><b>R</b><b>K</b><b>A</b></span><span>One room. Every bid in view.</span></div>
          </div>
          <div className="hero__visual"><AuctionBoard /><span className="hero__visual-note">YOUR AUCTION, IN CONTROL <span aria-hidden="true">↗</span></span></div>
        </section>

        <div className="ticker" aria-label="Cricauction features">
          <div className="ticker__inner"><span>PLAYER AUCTIONS</span><i>✳</i><span>TEAM PURSE CONTROL</span><i>✳</i><span>SQUAD BUILDING</span><i>✳</i><span>PLAYER AUCTIONS</span><i>✳</i><span>TEAM PURSE CONTROL</span></div>
        </div>

        <section className="platform-section section-pad" id="platform">
          <div className="site-container">
            <div className="section-intro">
              <div><p className="eyebrow"><span className="eyebrow__line" /> THE WHOLE ROOM, IN SYNC</p><h2>Auctions move fast.<br /><em>Your decisions should feel clear.</em></h2></div>
              <p>From the first player called to the final purse check, Cricauction keeps the moving parts together—so teams can bid with intent and organizers can stay in control.</p>
            </div>
            <div className="feature-grid">
              <article className="feature-card feature-card--dark"><span className="feature-card__number">01 / BID</span><div className="feature-icon feature-icon--lime">↗</div><h3>Keep every bid visible.</h3><p>See who is leading, follow the bid as it changes, and keep the auction moving without losing the thread.</p><a href="#how-it-works">Explore the auction flow <span>↗</span></a></article>
              <article className="feature-card"><span className="feature-card__number">02 / PURSE</span><div className="feature-icon">₹</div><h3>Know what’s left to spend.</h3><p>Keep each team’s budget in view as players are picked, helping captains plan the next move.</p><a href="#how-it-works">See purse management <span>↗</span></a></article>
              <article className="feature-card"><span className="feature-card__number">03 / SQUAD</span><div className="feature-icon">✳</div><h3>Build a balanced XI.</h3><p>Track squad size and player roles together, from the first pick through the closing bid.</p><a href="#how-it-works">Build your team <span>↗</span></a></article>
            </div>
          </div>
        </section>

        <section className="process-section section-pad" id="how-it-works">
          <div className="site-container process-layout">
            <div className="process-heading"><p className="eyebrow"><span className="eyebrow__line" /> FROM FIRST CALL TO FINAL SQUAD</p><h2>Simple to run.<br /><em>Serious about the details.</em></h2><p>Keep the auction room focused on cricket. Cricauction brings the player board, bid flow, and team purse into one view.</p><button className="button button--lime" onClick={() => openAuth(user ? 'login' : 'signup')}>Set up an auction <span aria-hidden="true">↗</span></button></div>
            <div className="process-steps">
              <article><span>01</span><div><h3>Set the rules</h3><p>Prepare the player pool, team list, and purse limits before the room opens.</p></div></article>
              <article><span>02</span><div><h3>Call, bid, confirm</h3><p>Keep the active player and leading bid clear while each team makes its move.</p></div></article>
              <article><span>03</span><div><h3>Close with confidence</h3><p>Review each team’s spend and squad as the final players are assigned.</p></div></article>
            </div>
          </div>
        </section>

        <section className="pricing-section section-pad" id="pricing">
          <div className="site-container">
            <div className="pricing-heading"><div><p className="eyebrow"><span className="eyebrow__line" /> PRICING THAT PLAYS FAIR</p><h2>Choose your<br /><em>auction setup.</em></h2></div><p>Start with what you need today. Move up when your tournament grows.</p></div>
            <div className="pricing-grid">
              {plans.map((plan, index) => (
                <article className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`} key={plan.name}>
                  {plan.featured && <span className="pricing-card__badge">MOST POPULAR</span>}
                  <span className="pricing-card__index">0{index + 1} / PLAN</span>
                  <h3>{plan.name}</h3><p className="pricing-card__description">{plan.description}</p>
                  <p className="pricing-card__price">{plan.price}<span>{plan.cadence}</span></p>
                  <ul>{plan.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
                  <button className={`button ${plan.featured ? 'button--lime' : 'button--outline'}`} onClick={() => openAuth(user ? 'login' : 'signup')}>
                    {plan.action} <span aria-hidden="true">↗</span>
                  </button>
                </article>
              ))}
            </div>
            <p className="pricing-note">Plan names, prices, and inclusions are draft examples to refine before launch.</p>
          </div>
        </section>

        <section className="closing-cta">
          <div className="site-container closing-cta__inner"><p className="eyebrow"><span className="eyebrow__line" /> THE NEXT GREAT TEAM STARTS HERE</p><h2>Ready to call<br />your first player?</h2><button className="button button--lime" onClick={() => openAuth(user ? 'login' : 'signup')}>Get your auction started <span aria-hidden="true">↗</span></button></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container site-footer__top"><a className="brand brand--footer" href="#top"><BrandMark /><span>Cric<span className="brand__accent">auction</span></span></a><p>Every bid has a plan.</p><nav aria-label="Footer navigation"><a href="#platform">Platform</a><a href="#pricing">Plans</a><a href="#top">Back to top ↑</a></nav></div>
        <div className="site-container site-footer__bottom"><span>© {new Date().getFullYear()} Cricauction</span><span>Built for the love of the game.</span></div>
      </footer>

      {authView && <AuthForm key={authView} initialView={authView} onClose={() => setAuthView(null)} onAuthenticated={(authenticatedUser) => {
        onAuthenticated(authenticatedUser);
        setAuthView(null);
      }} />}
    </div>
  );
}

export default LandingPage;
