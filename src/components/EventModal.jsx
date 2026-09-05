import { useState, useEffect } from 'react';
import { X, CheckCircle, Calendar, MapPin, Download } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [batch, setBatch] = useState('S5 IT');
  const [registered, setRegistered] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!event) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'SAIT-2026-' + Math.floor(1000 + Math.random() * 9000);
    setTicketId(id);
    setRegistered(true);
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="ticket-modal" onClick={e => e.stopPropagation()}>
        <button className="ticket-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20}/>
        </button>

        {!registered ? (
          <div>
            <div className="eyebrow" style={{marginBottom:'6px'}}>REGISTRATION / SAIT PASS</div>
            <h2 style={{fontSize:'26px', margin:'0 0 10px', letterSpacing:'-0.03em'}}>{event.title}</h2>
            <p style={{fontSize:'13px', color:'var(--muted)', margin:'0 0 20px', lineHeight:'1.5'}}>
              {event.description}
            </p>

            <div style={{display:'grid', gap:'8px', fontSize:'12px', background:'var(--paper)', padding:'14px', borderRadius:'6px', marginBottom:'22px'}}>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <Calendar size={14} color="var(--purple)"/>
                <span>{event.day} {event.month} 2026 · {event.time}</span>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <MapPin size={14} color="var(--purple)"/>
                <span>{event.venue}</span>
              </div>
              <div style={{fontSize:'11px', color:'var(--muted)', marginTop:'4px'}}>
                Fee: <b>{event.fee}</b> · Prize Pool: <b>{event.prizePool}</b>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{display:'grid', gap:'16px'}}>
              <label style={{display:'grid', gap:'6px', fontSize:'11px', fontWeight:800}}>
                Full Name
                <input
                  required
                  placeholder="e.g. Rahul S"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{border:'1px solid var(--line)', padding:'9px 12px', borderRadius:'4px'}}
                />
              </label>

              <div className="modal-form-row">
                <label style={{display:'grid', gap:'6px', fontSize:'11px', fontWeight:800}}>
                  CUSAT Reg No. / Roll No.
                  <input
                    required
                    placeholder="e.g. 23IT104"
                    value={regNo}
                    onChange={e => setRegNo(e.target.value)}
                    style={{border:'1px solid var(--line)', padding:'9px 12px', borderRadius:'4px'}}
                  />
                </label>

                <label style={{display:'grid', gap:'6px', fontSize:'11px', fontWeight:800}}>
                  Semester / Batch
                  <select
                    value={batch}
                    onChange={e => setBatch(e.target.value)}
                    style={{border:'1px solid var(--line)', padding:'9px 12px', borderRadius:'4px'}}
                  >
                    <option>S1 IT (Freshers)</option>
                    <option>S3 IT (2nd Year)</option>
                    <option>S5 IT (3rd Year)</option>
                    <option>S7 IT (Final Year)</option>
                    <option>Other Department</option>
                  </select>
                </label>
              </div>

              <button className="submit-btn" type="submit" style={{marginTop:'10px'}}>
                Confirm Registration & Generate Pass
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div style={{display:'flex', alignItems:'center', gap:'8px', color:'#1a7d42', fontSize:'13px', fontWeight:800, marginBottom:'10px'}}>
              <CheckCircle size={18}/> Registration Confirmed!
            </div>
            <h2 style={{fontSize:'24px', margin:'0 0 6px', letterSpacing:'-0.03em'}}>Your Digital Event Pass</h2>
            <p style={{fontSize:'12px', color:'var(--muted)', margin:'0 0 16px'}}>
              Show this QR pass or mention Pass ID at the venue registration desk.
            </p>

            <div className="ticket-pass">
              <div className="ticket-pass-top">
                <span>SAIT OFFICIAL ATTENDEE PASS</span>
                <span>{ticketId}</span>
              </div>

              <div className="ticket-pass-body">
                <div>
                  <h3 style={{color:'#fff'}}>{event.title}</h3>
                  <p>{name} · {regNo} ({batch})</p>
                  <p style={{color:'var(--lime)', marginTop:'4px'}}>{event.day} {event.month} · {event.venue}</p>
                </div>

                <div className="ticket-qr">
                  <svg viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#ffffff" />
                    {/* Simulated SVG QR pattern */}
                    <rect x="5" y="5" width="30" height="30" fill="#0a0d12" />
                    <rect x="10" y="10" width="20" height="20" fill="#ffffff" />
                    <rect x="15" y="15" width="10" height="10" fill="#0a0d12" />

                    <rect x="65" y="5" width="30" height="30" fill="#0a0d12" />
                    <rect x="70" y="10" width="20" height="20" fill="#ffffff" />
                    <rect x="75" y="15" width="10" height="10" fill="#0a0d12" />

                    <rect x="5" y="65" width="30" height="30" fill="#0a0d12" />
                    <rect x="10" y="70" width="20" height="20" fill="#ffffff" />
                    <rect x="15" y="75" width="10" height="10" fill="#0a0d12" />

                    <rect x="42" y="10" width="8" height="20" fill="#0a0d12" />
                    <rect x="42" y="42" width="16" height="16" fill="#0a0d12" />
                    <rect x="65" y="45" width="10" height="20" fill="#0a0d12" />
                    <rect x="42" y="70" width="18" height="18" fill="#0a0d12" />
                    <rect x="70" y="75" width="15" height="15" fill="#0a0d12" />
                  </svg>
                </div>
              </div>
            </div>

            <div style={{display:'flex', gap:'12px', marginTop:'20px'}}>
              <button
                className="submit-btn"
                style={{flex:1, padding:'11px'}}
                onClick={handleDownload}
              >
                {downloaded ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={14}/> Pass Saved!
                  </span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Download size={14}/> Download Pass
                  </span>
                )}
              </button>
              <button
                style={{background:'none', border:'1px solid var(--line)', borderRadius:'999px', padding:'11px 18px', fontSize:'12px', fontWeight:700, cursor:'pointer'}}
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
