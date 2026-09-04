import { useState, useEffect } from 'react';
import { ArrowUpRight, Trophy, Clock, Users, MapPin, Flame } from 'lucide-react';

export default function HackathonCountdown({ event, onRegister, onDetails }) {
  // Target: October 18, 2026 09:00:00 IST
  const targetDate = new Date('2026-10-18T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const diff = Math.max(0, targetDate - now);

    return {
      total: diff,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="hackathon-showcase-card">
      {/* Top Meta Bar */}
      <div className="h-top-bar">
        <div className="h-badge-tag">
          <Flame size={13} className="flame-icon" />
          <span>01 / NEXT FLAGSHIP EVENT</span>
        </div>
        <div className="h-live-status">
          <span className="live-pulse-dot" />
          <span>REGISTRATION LIVE</span>
        </div>
      </div>

      {/* Main Title & Tagline */}
      <div className="h-header-area">
        <div className="h-date-chip">OCT 18—19, 2026</div>
        <h2 className="h-main-title">{event?.title || 'Ignite Hackathon 2026'}</h2>
        <p className="h-tagline">
          The premier 36-hour annual hackathon by SAIT — engineering prototypes in AI, 
          Web3, Distributed Systems, and Climate Tech.
        </p>
      </div>

      {/* Live Countdown Clock */}
      <div className="h-countdown-wrap">
        <div className="h-countdown-header">
          <span className="h-countdown-label">
            <Clock size={12} /> HACKING COMMENCES IN
          </span>
          <span className="h-timezone">IST (UTC+05:30)</span>
        </div>

        <div className="h-timer-grid">
          <div className="h-time-block">
            <div className="h-time-val">{pad(timeLeft.days)}</div>
            <div className="h-time-unit">DAYS</div>
          </div>
          <span className="h-time-sep">:</span>
          <div className="h-time-block">
            <div className="h-time-val">{pad(timeLeft.hours)}</div>
            <div className="h-time-unit">HOURS</div>
          </div>
          <span className="h-time-sep">:</span>
          <div className="h-time-block">
            <div className="h-time-val">{pad(timeLeft.minutes)}</div>
            <div className="h-time-unit">MINS</div>
          </div>
          <span className="h-time-sep">:</span>
          <div className="h-time-block highlight">
            <div className="h-time-val">{pad(timeLeft.seconds)}</div>
            <div className="h-time-unit">SECS</div>
          </div>
        </div>
      </div>

      {/* Key Related Data & Metrics Grid */}
      <div className="h-metrics-grid">
        <div className="h-metric-item">
          <div className="h-m-icon"><Trophy size={15} /></div>
          <div>
            <div className="h-m-label">PRIZE POOL</div>
            <div className="h-m-val">{event?.prizePool || '₹50,000'}</div>
          </div>
        </div>
        <div className="h-metric-item">
          <div className="h-m-icon"><Clock size={15} /></div>
          <div>
            <div className="h-m-label">DURATION</div>
            <div className="h-m-val">36 Hours Sprint</div>
          </div>
        </div>
        <div className="h-metric-item">
          <div className="h-m-icon"><Users size={15} /></div>
          <div>
            <div className="h-m-label">TEAM SIZE</div>
            <div className="h-m-val">1 — 4 Builders</div>
          </div>
        </div>
        <div className="h-metric-item">
          <div className="h-m-icon"><MapPin size={15} /></div>
          <div>
            <div className="h-m-label">VENUE</div>
            <div className="h-m-val">Main Aud., SOE CUSAT</div>
          </div>
        </div>
      </div>

      {/* Tracks & Focus Areas */}
      <div className="h-tracks-row">
        <span className="h-tracks-title">TRACKS:</span>
        <span className="h-track-pill">AI & Neural</span>
        <span className="h-track-pill">Web3 / FinTech</span>
        <span className="h-track-pill">IoT & Edge</span>
        <span className="h-track-pill">Open Track</span>
      </div>

      {/* Live Registration Capacity Bar */}
      <div className="h-capacity-bar">
        <div className="h-cap-labels">
          <span>Registered: <b>142 Teams</b></span>
          <span>Cap: <b>200 Teams (71%)</b></span>
        </div>
        <div className="h-cap-track">
          <div className="h-cap-fill" style={{ width: '71%' }} />
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="h-actions-row">
        <button 
          className="h-primary-btn" 
          onClick={() => onRegister && onRegister(event)}
        >
          <span>Get Digital Pass</span>
          <ArrowUpRight size={15} />
        </button>
        <button 
          className="h-secondary-btn" 
          onClick={() => onDetails && onDetails(event)}
        >
          <span>View Rulebook & Info</span>
          <ArrowUpRight size={13} />
        </button>
      </div>
    </div>
  );
}
