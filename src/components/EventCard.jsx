import { ArrowUpRight, MapPin, Clock } from 'lucide-react';

export default function EventCard({ event, featured = false, onRegister }) {
  const accentClass = event.accent ? `accent-${event.accent}` : 'accent-purple';

  return (
    <article className={`event-card ${featured ? 'featured ' : ''}${accentClass}`}>
      <div className="date-box">
        <b>{event.day}</b>
        <span>{event.month}</span>
      </div>

      <div className="event-copy">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="tag">{event.category}</span>
          {event.flagship && <span className="tag flagship">FLAGSHIP</span>}
        </div>
        <h3>{event.title}</h3>
        <p>{event.description || event.meta}</p>
        <div className="event-meta-line">
          {event.time && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={11} color="var(--purple)" /> {event.time}
            </span>
          )}
          {event.venue && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={11} color="var(--purple)" /> {event.venue}
            </span>
          )}
        </div>
      </div>

      <button
        className="circle-arrow"
        aria-label={`Register for ${event.title}`}
        onClick={() => onRegister && onRegister(event)}
        title="Register for Event"
      >
        <ArrowUpRight size={18} />
      </button>
    </article>
  );
}
