import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, FileText, Bell, Trophy, BookOpen, ArrowRight, X } from 'lucide-react';
import { events, faculty, people, notices, academicResources } from '../data/data';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const q = query.toLowerCase().trim();

  // Search items across entire platform
  const items = useMemo(() => [
    { title: 'Home / Overview', type: 'Page', icon: <ArrowRight size={14}/>, path: '/' },
    { title: 'About Department & SAIT', type: 'Page', icon: <ArrowRight size={14}/>, path: '/about' },
    { title: 'Faculty & Administration Directory', type: 'Section', icon: <Users size={14}/>, path: '/about#faculty' },
    { title: 'Academic Resources & Syllabus', type: 'Section', icon: <BookOpen size={14}/>, path: '/about#resources' },
    { title: 'Executive Committee & Sub-teams', type: 'Page', icon: <Users size={14}/>, path: '/people' },
    { title: 'Events Calendar & Activities', type: 'Page', icon: <Calendar size={14}/>, path: '/events' },
    { title: 'Placements & Career Resources', type: 'Page', icon: <FileText size={14}/>, path: '/placements' },
    { title: 'Alumni Network & Spotlights', type: 'Page', icon: <Users size={14}/>, path: '/alumni' },
    { title: 'Hall of Fame & Achievements', type: 'Page', icon: <Trophy size={14}/>, path: '/achievements' },
    { title: 'Student Activity Logger', type: 'Tool', icon: <FileText size={14}/>, path: '/activity' },
    { title: 'Notices & Department Circulars', type: 'Page', icon: <Bell size={14}/>, path: '/notices' },

    // Events
    ...events.map(e => ({
      title: `${e.title} (${e.day} ${e.month})`,
      type: 'Event',
      icon: <Calendar size={14}/>,
      path: '/events'
    })),

    // Faculty
    ...faculty.map(f => ({
      title: `${f.name} — ${f.role}`,
      type: 'Faculty',
      icon: <Users size={14}/>,
      path: '/about#faculty'
    })),

    // Academic Resources
    ...academicResources.map(r => ({
      title: `${r.title} [${r.format}]`,
      type: 'Resource',
      icon: <BookOpen size={14}/>,
      path: '/about#resources'
    })),

    // Notices
    ...notices.map(n => ({
      title: n.title,
      type: 'Notice',
      icon: <Bell size={14}/>,
      path: '/notices'
    }))
  ], []);

  const filtered = useMemo(() => {
    return q
      ? items.filter(item => item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)).slice(0, 8)
      : items.slice(0, 7);
  }, [items, q]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [q]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = (path) => {
    navigate(path);
    onClose(false);
    setQuery('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        onClose(false);
      } else if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filtered[selectedIndex]) {
            handleSelect(filtered[selectedIndex].path);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => onClose(false)}>
      <div className="cmd-dialog" onClick={e => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <Search size={18} color="var(--purple)"/>
          <input
            autoFocus
            placeholder="Search events, faculty, notices, teams, resources..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button style={{background:'none', border:0, cursor:'pointer', color:'var(--muted)'}} onClick={() => onClose(false)}>
            <X size={18}/>
          </button>
        </div>

        <div className="cmd-results">
          {filtered.length === 0 ? (
            <div style={{padding:'24px', textAlign:'center', color:'var(--muted)', fontSize:'13px'}}>
              No results found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className={`cmd-item ${idx === selectedIndex ? 'active' : ''}`}
                onClick={() => handleSelect(item.path)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="cmd-item-left">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                <span className="cmd-item-type">{item.type}</span>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigation Quick Search</span>
          <span>ESC to close · ↑↓ navigate · ↵ to select</span>
        </div>
      </div>
    </div>
  );
}
