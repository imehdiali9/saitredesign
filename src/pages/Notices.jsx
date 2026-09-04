import { useState } from 'react';
import { Bell, ArrowUpRight, Search, AlertCircle, Calendar, Pin } from 'lucide-react';
import { notices } from '../data/data';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';

export default function Notices() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const categories = ['All', 'Urgent', 'Academic', 'Events', 'Placements', 'General'];

  const filtered = notices.filter((n) => {
    const matchesCat = filter === 'All' || n.category === filter;
    const query = q.toLowerCase();
    const matchesQuery =
      n.title.toLowerCase().includes(query) ||
      n.content.toLowerCase().includes(query) ||
      n.source.toLowerCase().includes(query);

    return matchesCat && matchesQuery;
  });

  return (
    <div className="page">
      <div className="page-hero compact">
        <div className="eyebrow">08 / NOTICES & ANNOUNCEMENTS</div>
        <h1>
          Important updates,
          <br />
          one place.
        </h1>
        <p>
          Official circulars, registration deadlines, exam schedules, and department notices
          from the Head of Department office and SAIT Executive Body.
        </p>
      </div>

      <section className="section notices-page">
        {/* Pinned Priority Alert Banner */}
        <div className="pinned-notice">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--lime)', font: "500 10px 'DM Mono'" }}>
              <Pin size={12} /> PINNED ANNOUNCEMENT · URGENT DEADLINE
            </div>
            <h3>Activity Logger odd semester verification window closes Friday, 5:00 PM</h3>
            <p>
              Students must submit certificates for hackathons, papers, and workshops to claim KTU/CUSAT points.
            </p>
          </div>
          <a
            href="/activity"
            style={{
              background: 'var(--lime)',
              color: 'var(--ink)',
              padding: '9px 16px',
              borderRadius: '999px',
              fontWeight: 800,
              fontSize: '11px',
              whiteSpace: 'nowrap'
            }}
          >
            Submit Proof Now
          </a>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="notices-filter-bar">
          <div className="filters">
            {categories.map((c) => (
              <button
                key={c}
                className={filter === c ? 'selected' : ''}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="search">
            <Search size={15} color="var(--purple)" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search circulars, exams..."
            />
          </label>
        </div>

        {/* Notices Stack */}
        <div className="notices-large">
          {filtered.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.04}>
              <article
                style={{ cursor: 'pointer' }}
                onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}
              >
                <div className="notice-number">{n.id}</div>
                <Bell size={18} color="var(--purple)" />
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <span className="tag">{n.category}</span>
                    <span className="notice-source">Issued by: {n.source}</span>
                  </div>
                  <h3>{n.title}</h3>
                  <p>{n.content}</p>
                </div>
                <span style={{ font: "500 10px 'DM Mono'", color: 'var(--muted)', textAlign: 'right' }}>
                  {n.date}
                </span>
                <ArrowUpRight
                  size={18}
                  style={{
                    transform: expandedId === n.id ? 'rotate(90deg)' : 'none',
                    transition: 'transform 0.2s'
                  }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
