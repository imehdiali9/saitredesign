import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight, Menu, X, Search, Mail, Phone, MapPin,
  Send, CheckCircle, ExternalLink
} from 'lucide-react';
import { IconInstagram, IconLinkedin, IconGithub, IconYoutube } from './Icons';
import CommandPalette from './CommandPalette';

const nav = [
  ['About', '/about'],
  ['People', '/people'],
  ['Events', '/events'],
  ['Placements', '/placements'],
  ['Alumni', '/alumni'],
  ['Hall of Fame', '/achievements'],
  ['Activity Logger', '/activity'],
  ['Notices', '/notices']
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const location = useLocation();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('General Inquiry');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 1000);
  };

  return (
    <div className="app-shell">
      <div className="noise" />
      <div className="top-line" />

      {/* Sticky Top Navigation */}
      <header className="nav-wrap">
        <Link className="brand" to="/">
          <img src="/sait-logo.png" alt="SAIT Logo" className="brand-logo" />
          <span className="brand-mark">SAIT</span>
          <span className="brand-sub">
            DIVISION OF IT<br />SOE · CUSAT
          </span>
        </Link>

        <nav className="desktop-nav">
          {nav.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="cmd-trigger-btn"
            onClick={() => setCmdOpen(true)}
            aria-label="Quick search"
            title="Search site (Ctrl+K)"
          >
            <Search size={13} />
            <span>Search</span>
            <kbd>Ctrl K</kbd>
          </button>

          <Link className="nav-cta" to="/activity">
            Log activity <ArrowUpRight size={15} />
          </Link>

          <button
            className="mobile-menu"
            onClick={() => setOpen(v => !v)}
            aria-label="menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--line)' }}>
              <button
                className="cmd-trigger-btn"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => { setOpen(false); setCmdOpen(true); }}
              >
                <Search size={14} />
                <span>Search pages, events, notices...</span>
              </button>
            </div>
            {nav.map(([label, path]) => (
              <NavLink
                onClick={() => setOpen(false)}
                key={path}
                to={path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {label}
              </NavLink>
            ))}
            <Link
              onClick={() => setOpen(false)}
              to="/activity"
              style={{ padding: '16px 20px', background: 'var(--purple)', color: '#fff', fontWeight: 800 }}
            >
              Log your student activity <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Section L: Footer & Contact (Official Requirement) */}
      <section className="footer-contact-wrap" id="contact">
        <div className="footer-contact-grid">
          {/* Contact Info & Location Map Card */}
          <div className="contact-left">
            <div className="eyebrow">SECTION L / CONTACT & LOCATION</div>
            <h2>Let's build<br />together.</h2>
            <p>
              Have ideas for a workshop, need sponsorship details for Ignite Hackathon,
              or want to verify your student activity points? Reach out directly to the
              association office.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <MapPin size={16} />
                <div>
                  <b>Division of Information Technology</b>
                  <br />
                  School of Engineering, Cochin University of Science and Technology
                  <br />
                  South Kalamassery, Ernakulam, Kochi, Kerala — 682022
                </div>
              </div>

              <div className="contact-item">
                <Mail size={16} />
                <div>
                  <a href="mailto:sait@cusat.ac.in" style={{ color: 'var(--purple)', fontWeight: 700 }}>
                    sait@cusat.ac.in
                  </a>
                  {' · '}
                  <a href="mailto:itdept@cusat.ac.in" style={{ color: 'var(--muted)' }}>
                    itdept@cusat.ac.in
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <Phone size={16} />
                <div>+91 (484) 286 2100 / 286 2101 (Dept Office)</div>
              </div>
            </div>

            {/* SOE Campus Map Card */}
            <div className="map-card">
              <div className="map-header">
                <span>SOE CUSAT CAMPUS LOCATION</span>
                <span className="map-coords">10.0438° N, 76.3243° E</span>
              </div>
              <div className="map-directions">
                Located inside the Main CUSAT Thrikkakara Campus, opposite the University Library.
                Accessible via Cochin Metro (CUSAT Metro Station - 1.2 km).
              </div>
              <a
                href="https://maps.google.com/?q=School+of+Engineering+CUSAT+Kalamassery"
                target="_blank"
                rel="noreferrer"
                className="map-btn"
              >
                Open in Google Maps <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Contact Form UI */}
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                <span style={{ font: "500 10px 'DM Mono'", color: 'var(--purple)' }}>MESSAGE THE ASSOCIATION</span>
                <span style={{ font: "500 9px 'DM Mono'", color: 'var(--muted)' }}>DIRECT INBOX</span>
              </div>

              {contactSent ? (
                <div className="submit-success-toast">
                  <CheckCircle size={18} />
                  <span>Message dispatched to SAIT Executive! We'll reply within 24 hours.</span>
                </div>
              ) : null}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <label>
                  Your Name
                  <input
                    required
                    placeholder="e.g. Maya Krishnan"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                  />
                </label>
                <label>
                  CUSAT Email / Work Email
                  <input
                    required
                    type="email"
                    placeholder="e.g. student@cusat.ac.in"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                  />
                </label>
              </div>

              <label>
                Subject / Query Category
                <select
                  value={contactTopic}
                  onChange={e => setContactTopic(e.target.value)}
                >
                  <option>General Inquiry</option>
                  <option>Ignite Hackathon & Event Queries</option>
                  <option>Student Activity Points Verification</option>
                  <option>Sponsorship & Industry Collaboration</option>
                  <option>Alumni Mentorship Connect</option>
                </select>
              </label>

              <label>
                Message
                <textarea
                  required
                  rows={4}
                  placeholder="How can SAIT assist you or what would you like to collaborate on?"
                  value={contactMsg}
                  onChange={e => setContactMsg(e.target.value)}
                />
              </label>

              <button className="contact-send-btn" type="submit">
                <Send size={15} /> Send Message to SAIT Desk
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Standard Bottom Footer */}
      <footer className="footer">
        <div>
          <div className="footer-brand">
            SAIT<span> / IT</span>
          </div>
          <p>
            Students Association of Information Technology
            <br />
            Division of Information Technology
            <br />
            School of Engineering · Cochin University of Science and Technology
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <IconInstagram size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <IconLinkedin size={14} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
              <IconGithub size={14} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <IconYoutube size={14} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <div style={{ font: "500 9px 'DM Mono'", color: 'var(--muted)', marginBottom: '8px' }}>CORE SECTIONS</div>
            <div style={{ display: 'grid', gap: '6px' }}>
              <Link to="/about">About & Faculty</Link>
              <Link to="/people">People & Teams</Link>
              <Link to="/events">Events & Activities</Link>
              <Link to="/placements">Placements & Careers</Link>
            </div>
          </div>
          <div>
            <div style={{ font: "500 9px 'DM Mono'", color: 'var(--muted)', marginBottom: '8px' }}>STUDENT PORTAL</div>
            <div style={{ display: 'grid', gap: '6px' }}>
              <Link to="/activity">Activity Logger</Link>
              <Link to="/achievements">Hall of Fame</Link>
              <Link to="/alumni">Alumni Directory</Link>
              <Link to="/notices">Notices & Circulars</Link>
            </div>
          </div>
        </div>

        <div className="footer-end">
          © 2026 SAIT CUSAT.
          <br />
          Built by students, for students who build.
          <br />
          <span style={{ font: "500 9px 'DM Mono'", color: 'var(--purple)', marginTop: '8px', display: 'inline-block' }}>
            PRESS CTRL+K TO SEARCH
          </span>
        </div>
      </footer>

      {/* Global Command Palette */}
      <CommandPalette isOpen={cmdOpen} onClose={setCmdOpen} />
    </div>
  );
}
