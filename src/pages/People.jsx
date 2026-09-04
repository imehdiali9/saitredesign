import { useState } from 'react';
import { Search, Users } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import PersonCard from '../components/PersonCard';
import { people } from '../data/data';

export default function People() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');

  const groups = ['All', 'Executive Committee', 'Tech', 'Media', 'Events', 'PR', 'Content'];

  const filtered = people.filter((p) => {
    const matchesFilter = filter === 'All' || p.team === filter;
    const query = q.toLowerCase();
    const matchesQuery =
      p.name.toLowerCase().includes(query) ||
      p.role.toLowerCase().includes(query) ||
      p.team.toLowerCase().includes(query) ||
      (p.bio && p.bio.toLowerCase().includes(query));

    return matchesFilter && matchesQuery;
  });

  return (
    <div className="page">
      <div className="page-hero compact">
        <div className="eyebrow">02 / ASSOCIATION & PEOPLE</div>
        <h1>
          The people behind
          <br />
          the signal.
        </h1>
        <p>
          Executive committee, leads, and student builders driving tech, media, events,
          PR, and content across the Division of Information Technology, SOE CUSAT.
        </p>
      </div>

      {/* Tribute Honor Spotlight — Positioned at Top */}
      <section className="section tribute-section-top">
        <Reveal>
          <div className="tribute-card">
            <div className="tribute-content">
              <div className="tribute-eyebrow">
                <span className="tribute-badge">
                  <span className="tribute-star">✦</span> IN MEMORIAM
                </span>
                <span className="tribute-meta">DIVISION OF IT · SOE CUSAT</span>
              </div>
              <h2 className="tribute-title">
                IN MEMORY OF<br/>
                <span className="tribute-name">ABHIJIT MENON</span>
              </h2>
              <div className="tribute-divider" />
              <p className="tribute-text">
                Abhijit Menon was a visionary IT student of SOE, known for his passion for science,
                technology, and original ideas. He inspired those around him to think creatively and
                approach problems in unconventional ways. His curiosity and enthusiasm for learning
                pushed him to constantly explore new ideas and challenge boundaries. Though he is no
                longer with us, his spirit of innovation and love for knowledge will continue to inspire
                future generations.
              </p>
              <div className="tribute-quote">
                “His spirit of innovation and love for knowledge will continue to inspire future generations.”
              </div>
            </div>
            <div className="tribute-image-col">
              <div className="tribute-image-frame">
                <img src="/abhijit.png" alt="Abhijit Menon" />
              </div>
              <div className="tribute-caption">Abhijit Menon · Department of IT</div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section people-directory-section">
        <div className="directory-header">
          <div className="eyebrow">CURRENT TEAM & LEADS</div>
          <h2 className="directory-title">Association Directory</h2>
        </div>

        {/* Toolbar: Category Filters & Real-time Search */}
        <div className="toolbar">
          <div className="filters">
            {groups.map((g) => (
              <button
                className={filter === g ? 'selected' : ''}
                onClick={() => setFilter(g)}
                key={g}
              >
                {g}
              </button>
            ))}
          </div>

          <label className="search">
            <Search size={15} color="var(--purple)" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search member, role, skill..."
            />
          </label>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
            <Users size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p>No team members match your current filter or query.</p>
          </div>
        ) : (
          <div className="people-grid">
            {filtered.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.03}>
                <PersonCard person={p} i={i} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
