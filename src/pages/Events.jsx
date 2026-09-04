import { useState } from 'react';
import { ArrowUpRight, Sparkles, Search } from 'lucide-react';
import { events, archiveEvents } from '../data/data';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

export default function Events() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const cats = ['All', 'Flagship', 'Hackathon', 'Talk', 'Workshop', 'Competition', 'Community'];

  const filteredUpcoming = events.filter((e) => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Flagship' ? e.flagship : e.category === filter);
    const query = q.toLowerCase();
    const matchesQuery =
      e.title.toLowerCase().includes(query) ||
      e.venue.toLowerCase().includes(query) ||
      (e.description && e.description.toLowerCase().includes(query));

    return matchesFilter && matchesQuery;
  });

  return (
    <div className="page">
      <div className="page-hero compact">
        <div className="eyebrow">03 / EVENTS & ACTIVITIES</div>
        <h1>
          The calendar
          <br />
          is the culture.
        </h1>
        <p>
          Find upcoming hackathons, tech talks, build nights, and sports competitions.
          Register directly to generate your digital event attendee QR pass.
        </p>
      </div>

      <section className="section">
        {/* Filter Toolbar */}
        <div className="toolbar">
          <div className="event-filter">
            {cats.map((c) => (
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
              placeholder="Search upcoming events..."
            />
          </label>
        </div>

        {/* Upcoming Events List */}
        <div className="events-list">
          {filteredUpcoming.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.05}>
              <EventCard
                event={e}
                onRegister={(ev) => setSelectedEvent(ev)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Past Events & Organised Archive (Official Section D Requirement) */}
      <section className="section archive">
        <Reveal>
          <SectionHead
            eyebrow="PAST / ORGANISED ARCHIVE"
            title="What already happened still matters."
            copy="A permanent record of past SAIT hackathons, open source initiatives, and build nights with participant footprints."
          />
        </Reveal>

        <div className="archive-grid">
          {archiveEvents.map((arch, i) => (
            <Reveal key={arch.title} delay={i * 0.06}>
              <div className="archive-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{arch.year}</span>
                    <span className="tag">{arch.category}</span>
                  </div>
                  <h3>{arch.title}</h3>
                  <p>{arch.desc}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <small style={{ font: "500 10px 'DM Mono'", color: 'var(--muted)' }}>
                    {arch.participants}
                  </small>
                  <ArrowUpRight size={16} color="var(--purple)" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Event Registration & Digital Pass Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
