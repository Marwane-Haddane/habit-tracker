import React from 'react';
import './Footer.css'; 

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-container">
        <div className="footer-content">
          
          
          <div className="footer-top">
            <div className="footer-brand">
              
              <div className="mini-grid-icon">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot active"></span>
              </div>
              <span className="brand-name">HabitTracker</span>
            </div>
            
            <div className="footer-nav">
              <a href="#top" className="footer-nav-link">Back to top</a>
              <a 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://www.linkedin.com/in/marwane-haddane/" 
                className="footer-nav-link"
              >
                LinkedIn
              </a>
              <a 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://marwane-haddane.web.app/" 
                className="footer-nav-link"
              >
                Portfolio
              </a>
            </div>
          </div>

          
          <a href="#tracker" className="footer-cta-group">
            <div className="cta-text-stack">
              <p className="cta-eyebrow">Ready to build your next streak?</p>
              <h2 className="cta-heading">Open Your Weekly Grid</h2>
            </div>

            
            <div className="cta-arrow-wrapper">
              <svg viewBox="0 0 85 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M4.20399 69.3437C4.20399 69.3437 44.5769 35.961 80.9889 5.85356M80.9889 5.85356C54.6851 27.603 27.6258 4.76412 27.6258 4.76412M80.9889 5.85356C54.6851 27.603 72.0338 58.4712 72.0338 58.4712" 
                  stroke="currentColor" 
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>

          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} HabitTracker. One checked day at a time.</p>
            <p className="owner-credit">Built by Marwane Haddane</p>
          </div>

        </div>
      </div>
    </footer>
  );
}