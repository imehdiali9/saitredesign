import { Mail } from 'lucide-react';
import { IconGithub, IconLinkedin } from './Icons';

export default function PersonCard({ person, i }) {
  // Support both object and legacy array format
  const isObj = typeof person === 'object' && !Array.isArray(person);
  const initials = isObj ? person.initials : person[0];
  const name = isObj ? person.name : person[1];
  const role = isObj ? person.role : person[2];
  const team = isObj ? person.team : person[3];
  const batch = isObj ? person.batch : 'IT Department';
  const bio = isObj ? person.bio : '';

  return (
    <article className="person-card">
      <div className="person-top">
        <div className="avatar" style={{ '--i': i }}>
          {initials}
        </div>
        <span className="person-badge">{team}</span>
      </div>

      <div className="person-info">
        <h3>{name}</h3>
        <div className="person-role">{role}</div>
        {bio && <p className="person-bio">{bio}</p>}
      </div>

      <div className="person-footer">
        <span>{batch}</span>
        <div className="person-links">
          {isObj && person.github && (
            <a href={person.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <IconGithub size={14} />
            </a>
          )}
          {isObj && person.linkedin && (
            <a href={person.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <IconLinkedin size={14} />
            </a>
          )}
          {isObj && person.email && (
            <a href={`mailto:${person.email}`} aria-label="Email">
              <Mail size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
