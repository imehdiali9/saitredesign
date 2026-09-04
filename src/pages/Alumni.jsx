import { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { IconLinkedin } from '../components/Icons';
import { alumni } from '../data/data';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';

export default function Alumni() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');

  const domains = ['All', 'Software Engineering', 'Research', 'Founder', 'FinTech'];

  const filtered = alumni.filter((a) => {
    const matchesDomain = filter === 'All' || a.domain === filter;
    const query = q.toLowerCase();
    const matchesQuery =
      a.name.toLowerCase().includes(query) ||
      a.company.toLowerCase().includes(query) ||
      a.role.toLowerCase().includes(query) ||
      a.contribution.toLowerCase().includes(query);

    return matchesDomain && matchesQuery;
  });

  return (
    <div className="page">
      <div className="page-hero compact">
        <div className="eyebrow">05 / ALUMNI COMMUNITY</div>
        <h1>
          Different years.
          <br />
          Same roots.
        </h1>
        <p>
          Spotlights from alumni who shaped SAIT during their college days and went on to
          lead teams across global tech, launch startups, and publish breakthrough research.
        </p>
      </div>

      <section className="section">
        <div className="toolbar">
          <div className="filters">
            {domains.map((d) => (
              <button
                key={d}
                className={filter === d ? 'selected' : ''}
                onClick={() => setFilter(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <label className="search">
            <Search size={15} color="var(--purple)" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search alumni, firm, batch..."
            />
          </label>
        </div>

        <div className="alumni-list">
          {filtered.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.06}>
              <article className="alumni-card">
                <div className="alumni-year">'{a.batch}</div>

                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                    <span className="alumni-tag">{a.domain}</span>
                    <span style={{ font: "500 10px 'DM Mono'", color: 'var(--muted)' }}>
                      Batch of 20{a.batch}
                    </span>
                  </div>
                  <h3>{a.name}</h3>
                  <div className="alumni-role">
                    {a.role} · <span style={{ color: 'var(--purple)' }}>{a.company}</span>
                  </div>
                  <p>{a.contribution}</p>
                </div>

                <div className="alumni-actions">
                  <a
                    href={a.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="alumni-connect-link"
                  >
                    <IconLinkedin size={13} /> Connect
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Community Banner */}
      <section className="section alumni-call">
        <div className="eyebrow" style={{ color: 'var(--ink)' }}>ALUMNI MENTORSHIP</div>
        <h2>Always part of SAIT.</h2>
        <p>
          Graduated from CUSAT IT? Sign up as a project mentor, keynote speaker, or judge
          for Ignite Hackathon.
        </p>
      </section>
    </div>
  );
}
