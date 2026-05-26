import React from 'react'

export default function Hero() {
  return (
   <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Weekly habit planning</p>
        <h1>Build quiet streaks, one checked day at a time.</h1>
        <p>
          Add your daily habits, mark each day on the weekly grid, and keep a
          quick eye on what is going well.
        </p>
        <a className="hero-link" href="#tracker">Start tracking</a>
      </div>

      <div className="hero-visual" aria-label="Habit tracker illustration">
        <img
          src="/hero-habit.png"
          alt="Calm desk with a weekly habit checklist, notebook, and plants"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <div className="hero-fallback" aria-hidden="true">
          <div className="mini-board">
            <span />
            <span />
            <span className="done" />
            <span />
            <span className="done" />
            <span className="done" />
            <span />
            <span className="done" />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}