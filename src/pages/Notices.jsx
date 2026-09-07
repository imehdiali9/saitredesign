import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ArrowUpRight, Search, AlertCircle, Calendar, Pin, Copy, CheckCircle2 } from 'lucide-react';
import { notices } from '../data/data';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';

export default function Notices() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

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

  const handleCopyNotice = (e, n) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`[${n.id}] ${n.title}\nDate: ${n.date}\nIssued by: ${n.source}\n\n${n.content}`);
    setCopiedId(n.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

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
          <Link
            to="/activity"
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
          </Link>
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
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
            <AlertCircle size={32} style={{ margin: '0 auto 12px', opacity: 0.5, color: 'var(--purple)' }} />
            <p style={{ margin: '0 0 12px', fontSize: '13px' }}>
              No notices or circulars match your current filter or query.
            </p>
            <button
              onClick={() => { setFilter('All'); setQ(''); }}
              style={{
                background: 'var(--ink)',
                color: '#fff',
                border: 'none',
                padding: '7px 18px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="notices-large">
            {filtered.map((n, i) => {
              const isExpanded = expandedId === n.id;
              return (
                <Reveal key={n.id} delay={i * 0.04}>
                  <article
                    className={`notice-article ${isExpanded ? 'is-expanded' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setExpandedId(isExpanded ? null : n.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setExpandedId(isExpanded ? null : n.id);
                      }
                    }}
                    aria-expanded={isExpanded}
                  >
                    <div className="notice-number">{n.id}</div>
                    <Bell size={18} color="var(--purple)" style={{ flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <span className="tag">{n.category}</span>
                        <span className="notice-source">Issued by: {n.source}</span>
                      </div>
                      <h3>{n.title}</h3>
                      <p className={`notice-text ${isExpanded ? 'is-open' : 'is-clamped'}`}>
                        {n.content}
                      </p>

                      {isExpanded && (
                        <div className="notice-actions-row">
                          <button
                            type="button"
                            className="notice-action-btn"
                            onClick={(e) => handleCopyNotice(e, n)}
                          >
                            {copiedId === n.id ? (
                              <>
                                <CheckCircle2 size={13} color="#16a34a" /> Copied Notice
                              </>
                            ) : (
                              <>
                                <Copy size={13} /> Copy Details
                              </>
                            )}
                          </button>
                          <span className="notice-verified-tag">
                            Official Division Circular
                          </span>
                        </div>
                      )}
                    </div>
                    <span style={{ font: "500 10px 'DM Mono'", color: 'var(--muted)', textAlign: 'right' }}>
                      {n.date}
                    </span>
                    <ArrowUpRight
                      size={18}
                      style={{
                        transform: isExpanded ? 'rotate(90deg)' : 'none',
                        transition: 'transform 0.2s',
                        color: isExpanded ? 'var(--purple)' : 'var(--muted)',
                        flexShrink: 0
                      }}
                    />
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
