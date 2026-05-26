import React from 'react'

export default function Nav() {
   return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="nav-title nav-hover" href="#top">Habit Tracker</a>
        <div className="nav-links">
          <a href="#tracker">Tracker</a>
          <a href="#footer">Contact</a>
        </div>
      </nav>
    </header>
  );
}