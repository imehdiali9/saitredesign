import { useState } from 'react';
import { Trophy, ExternalLink, Search } from 'lucide-react';
import { achievements } from '../data/data';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';

export default function Achievements() {
  const [filter, setFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [q, setQ] = useState('');

  const categories = ['All', 'Hackathon', 'Publication', 'Competition', 'Academic'];
  const years = ['All', '2026', '2025', '2024'];

  const filtered = achievements.filter((a) => {
    const matchesCat = filter === 'All' || a.category === filter;
    const matchesYear = yearFilter === 'All' || a.year === yearFilter;
    const query = q.toLowerCase();
    const matchesQuery =
      a.title.toLowerCase().includes(query) ||
      a.detail.toLowerCase().includes(query) ||
      a.type.toLowerCase().includes(query);

    return matchesCat && matchesYear && matchesQuery;
  });

  return (
    <div className="page">
      <div className="page-hero compact">
        <div className="eyebrow">06 / HALL OF FAME</div>
        <h1>
          Keep the receipts.
        </h1>
        <p>
          National hackathon podiums, IEEE research publications, competitive programming
          accolades, and university ranks — archived as permanent institutional memory.
        </p>
      </div>

      <section className="section">
        <div className="toolbar">
          <div className="filters">
            {categories.map((c) => (
              <button
                key={c}
                className={filter === c ? 'selected' : ''}
                onClick={() => setFilter(c)}
              >
                {c === 'All' ? 'All Honors' : c + 's'}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              style={{
                border: '1px solid var(--line)',
                background: '#fff',
                padding: '8px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600
              }}
            >
              <option value="All">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>

            <label className="search">
              <Search size={15} color="var(--purple)" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search achievement..."
              />
            </label>
          </div>
        </div>

        <div className="achieve-list">
          {filtered.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <article className="achieve-row">
                <span className="achieve-year">{a.year}</span>

                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="tag">{a.type}</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.detail}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span className="achieve-badge">{a.badge}</span>
                  {a.proof && (
                    <a
                      href={a.proof}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--purple)', fontWeight: 700 }}
                    >
                      Official Proof <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
