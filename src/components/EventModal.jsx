import { useState, useEffect } from 'react';
import { 
  X, CheckCircle, Calendar, MapPin, Download, BookOpen, 
  Ticket, Trophy, Clock, Users, ShieldCheck, Award, ArrowRight,
  FileText, Sparkles, Flame, Check
} from 'lucide-react';

export default function EventModal({ event, initialTab = 'register', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [batch, setBatch] = useState('S5 IT');
  const [registered, setRegistered] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  const [rulebookDownloaded, setRulebookDownloaded] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, event]);

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

  const isHackathon = event.category === 'Hackathon' || event.title?.toLowerCase().includes('hackathon');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'SAIT-2026-' + Math.floor(1000 + Math.random() * 9000);
    setTicketId(id);
    setRegistered(true);
  };

  const handleDownload = () => {
    const passContent = `=====================================================
SAIT OFFICIAL DIGITAL ATTENDEE PASS
School of Engineering, CUSAT | Division of Information Technology
=====================================================
Pass ID: ${ticketId}
Event: ${event.title}
Date & Time: ${event.day} ${event.month} 2026 (${event.time || 'Venue Schedule'})
Venue: ${event.venue}
Category: ${event.category}
-----------------------------------------------------
Attendee Name: ${name}
University Reg No: ${regNo}
Batch: ${batch}
Status: VERIFIED ADMISSION
-----------------------------------------------------
Please present this pass or Pass ID at the registration desk.
Inquiries: sait@cusat.ac.in | https://saitcusat.in
=====================================================`;

    const blob = new Blob([passContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SAIT_Pass_${ticketId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleDownloadRulebook = () => {
    const rulebookText = `=====================================================
SAIT ${event.title ? event.title.toUpperCase() : 'IGNITE HACKATHON 2026'}
OFFICIAL PARTICIPANT RULEBOOK & INFORMATION GUIDE
School of Engineering, CUSAT | Division of Information Technology
=====================================================

EVENT OVERVIEW:
- Event: ${event.title || 'Ignite Hackathon 2026'}
- Dates: ${event.day} ${event.month} 2026 (${event.time || '36 Hours'})
- Venue: ${event.venue || 'Main Auditorium, SOE CUSAT'}
- Category: ${event.category}
- Prize Pool: ${event.prizePool || '₹50,000'}
- Eligibility: Open to all undergraduate and postgraduate engineering students
- Activity Points: 100 KTU/CUSAT Activity Points Certified

1. ELIGIBILITY & TEAM GUIDELINES:
- Teams must comprise 1 to 4 members.
- Inter-college, inter-department, and cross-year teams are strictly permitted.
- All team members must carry their valid institutional student ID cards.
- Registration on the SAIT portal is mandatory for all team members.

2. TRACKS & DOMAINS:
- Track 1: AI & Neural Systems (Agentic AI, local LLMs, computer vision, natural language)
- Track 2: Web3 & FinTech (Decentralized identity, micro-settlements, smart contracts)
- Track 3: IoT, Robotics & Edge Systems (Smart campus, hardware telemetry, edge inference)
- Track 4: Open Innovation (Healthcare, climate tech, disaster management, civic tech)

3. OFFICIAL TIMELINE & MILESTONES:
- Day 1, 09:00 AM: Check-in, badge collection & networking breakfast
- Day 1, 10:30 AM: Opening ceremony & official problem statement release
- Day 1, 11:30 AM: Hacking officially begins (36-hour sprint)
- Day 1, 08:00 PM: Mentorship Checkpoint 1 (Architecture & Feasibility Review)
- Day 2, 02:00 AM: Midnight Coffee Jam & Technical debugging support
- Day 2, 10:00 AM: Mentorship Checkpoint 2 (Prototype progress & UI check)
- Day 2, 09:00 PM: Code Freeze & GitHub submission deadline
- Day 2, 10:00 PM: Live prototype demonstrations & jury evaluation
- Day 2, 11:30 PM: Grand valedictory & winner announcement

4. EVALUATION & JUDGING RUBRIC:
- Technical Execution & Architecture: 30%
- Innovation & Originality: 25%
- Practical Feasibility & Real-world Impact: 25%
- Presentation, UI/UX & Live Demo: 20%

5. RULES & CODE OF CONDUCT:
- All prototype code must be written during the official hackathon hours.
- Open source libraries, APIs, and pre-trained foundational models may be used with explicit disclosure.
- Submitting pre-built applications or plagiarized repositories results in immediate disqualification.
- All participants must adhere to the SAIT Code of Conduct: respectful, inclusive, and professional.

6. PRIZES & CERTIFICATION:
- 1st Place: ₹25,000 Cash + Champion Trophy + Certificate of Excellence
- 2nd Place: ₹15,000 Cash + Runner-up Trophy + Certificate of Merit
- 3rd Place: ₹10,000 Cash + Second Runner-up Trophy + Certificate of Merit
- Special awards for Best Freshers Team and Best All-Girls Team
- Official SAIT certificate carrying 100 KTU/CUSAT Activity Points for all certified completing teams.

Organized by:
Students' Association of Information Technology (SAIT)
Division of Information Technology, School of Engineering, CUSAT
Website: https://saitcusat.in | Email: sait@cusat.ac.in
=====================================================`;

    const blob = new Blob([rulebookText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(event.title || 'SAIT_Event').replace(/[^a-zA-Z0-9]/g, '_')}_Rulebook.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setRulebookDownloaded(true);
    setTimeout(() => setRulebookDownloaded(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`ticket-modal ${activeTab === 'rulebook' ? 'rulebook-mode' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ticket-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20}/>
        </button>

        {/* Modal Top Tab Switcher */}
        <div className="event-modal-tabs">
          <button 
            className={`event-modal-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
            type="button"
          >
            <Ticket size={14} />
            <span>Get Digital Pass</span>
          </button>
          <button 
            className={`event-modal-tab-btn ${activeTab === 'rulebook' ? 'active' : ''}`}
            onClick={() => setActiveTab('rulebook')}
            type="button"
          >
            <BookOpen size={14} />
            <span>Rulebook & Info</span>
          </button>
        </div>

        {/* TAB 1: RULEBOOK & EVENT INFO */}
        {activeTab === 'rulebook' && (
          <div className="rulebook-content">
            <div className="rulebook-header">
              <div className="eyebrow" style={{ marginBottom: '6px' }}>
                OFFICIAL SPECIFICATION / {event.category?.toUpperCase() || 'EVENT'} RULEBOOK
              </div>
              <h2 className="rulebook-main-title">{event.title}</h2>
              <p className="rulebook-desc">{event.description}</p>

              {/* Meta pills */}
              <div className="rulebook-meta-chips">
                <span className="rb-chip">
                  <Calendar size={13} color="var(--purple)" />
                  <span>{event.day} {event.month} 2026 · {event.time}</span>
                </span>
                <span className="rb-chip">
                  <MapPin size={13} color="var(--purple)" />
                  <span>{event.venue}</span>
                </span>
                <span className="rb-chip">
                  <Trophy size={13} color="var(--purple)" />
                  <span>Prize Pool: {event.prizePool}</span>
                </span>
                <span className="rb-chip">
                  <Award size={13} color="var(--purple)" />
                  <span>100 Activity Points</span>
                </span>
              </div>
            </div>

            {/* Quick Action Bar inside Rulebook */}
            <div className="rulebook-action-banner">
              <div>
                <div className="rb-banner-title">Need the offline handbook?</div>
                <div className="rb-banner-sub">Download complete guidelines, problem domains, and judging criteria.</div>
              </div>
              <button 
                className="rulebook-download-btn"
                onClick={handleDownloadRulebook}
                type="button"
              >
                {rulebookDownloaded ? (
                  <>
                    <Check size={14} /> Rulebook Saved
                  </>
                ) : (
                  <>
                    <Download size={14} /> Download Rulebook (.TXT)
                  </>
                )}
              </button>
            </div>

            {/* If Hackathon: Detailed Sections */}
            {isHackathon ? (
              <div className="rulebook-body-sections">
                {/* Tracks */}
                <div className="rb-section">
                  <div className="rb-section-title">
                    <Flame size={15} color="var(--purple)" />
                    <span>01. HACKATHON TRACKS & THEMES</span>
                  </div>
                  <div className="rb-tracks-grid">
                    <div className="rb-track-card">
                      <div className="rb-track-name">AI & Neural Systems</div>
                      <div className="rb-track-desc">Agentic workflows, fine-tuned SLMs, edge vision, audio synthesis, and assistive intelligence.</div>
                    </div>
                    <div className="rb-track-card">
                      <div className="rb-track-name">Web3 / FinTech</div>
                      <div className="rb-track-desc">Decentralized protocols, privacy-preserving zero-knowledge proofs, and micro-settlements.</div>
                    </div>
                    <div className="rb-track-card">
                      <div className="rb-track-name">IoT & Embedded Edge</div>
                      <div className="rb-track-desc">Smart campus sensing, robotics, environmental telemetry, and hardware controllers.</div>
                    </div>
                    <div className="rb-track-card">
                      <div className="rb-track-name">Open Innovation</div>
                      <div className="rb-track-desc">Solve real-world civic, healthcare, educational, or climate challenges with software.</div>
                    </div>
                  </div>
                </div>

                {/* Eligibility & Team Formulation */}
                <div className="rb-section">
                  <div className="rb-section-title">
                    <Users size={15} color="var(--purple)" />
                    <span>02. ELIGIBILITY & TEAM GUIDELINES</span>
                  </div>
                  <ul className="rb-rules-list">
                    <li><b>Team Composition:</b> 1 to 4 members per team. Inter-department and inter-batch teams are allowed and encouraged.</li>
                    <li><b>Student Verification:</b> All participants must carry a valid collegiate physical or digital ID card at check-in.</li>
                    <li><b>Registration:</b> Prior registration on the SAIT portal is compulsory to secure physical venue entry and hardware kit.</li>
                  </ul>
                </div>

                {/* Timeline */}
                <div className="rb-section">
                  <div className="rb-section-title">
                    <Clock size={15} color="var(--purple)" />
                    <span>03. 36-HOUR RUN SHEET & MILESTONES</span>
                  </div>
                  <div className="rb-timeline">
                    <div className="rb-timeline-item">
                      <span className="rb-tl-time">Day 1 · 09:00 AM</span>
                      <span className="rb-tl-text">Badge collection, breakfast, Wi-Fi onboarding & hardware kit allocation</span>
                    </div>
                    <div className="rb-timeline-item">
                      <span className="rb-tl-time">Day 1 · 10:30 AM</span>
                      <span className="rb-tl-text">Official keynote by Maya Nair (Cisco) & track problem statements unveiled</span>
                    </div>
                    <div className="rb-timeline-item">
                      <span className="rb-tl-time">Day 1 · 11:30 AM</span>
                      <span className="rb-tl-text"><b>Hacking Officially Begins</b> — 36-hour timer starts running</span>
                    </div>
                    <div className="rb-timeline-item">
                      <span className="rb-tl-time">Day 1 · 08:00 PM</span>
                      <span className="rb-tl-text">Mentorship Round 1: Architecture review, feasibility assessment & mentor guidance</span>
                    </div>
                    <div className="rb-timeline-item">
                      <span className="rb-tl-time">Day 2 · 02:00 AM</span>
                      <span className="rb-tl-text">Midnight code jam, energy refreshments, and optional mini-challenges</span>
                    </div>
                    <div className="rb-timeline-item">
                      <span className="rb-tl-time">Day 2 · 10:00 AM</span>
                      <span className="rb-tl-text">Mentorship Round 2: Progress validation & pitch deck dry-runs</span>
                    </div>
                    <div className="rb-timeline-item">
                      <span className="rb-tl-time">Day 2 · 09:00 PM</span>
                      <span className="rb-tl-text"><b>Hard Code Freeze</b> — GitHub repo link submission on SAIT portal</span>
                    </div>
                    <div className="rb-timeline-item">
                      <span className="rb-tl-time">Day 2 · 10:00 PM</span>
                      <span className="rb-tl-text">Live stage demonstrations, prototype testing & jury Q&A</span>
                    </div>
                    <div className="rb-timeline-item">
                      <span className="rb-tl-time">Day 2 · 11:30 PM</span>
                      <span className="rb-tl-text">Grand valedictory, winner announcements & trophy distribution</span>
                    </div>
                  </div>
                </div>

                {/* Judging Criteria */}
                <div className="rb-section">
                  <div className="rb-section-title">
                    <Trophy size={15} color="var(--purple)" />
                    <span>04. EVALUATION & SCORING RUBRIC</span>
                  </div>
                  <div className="rb-rubric-grid">
                    <div className="rb-rubric-card">
                      <div className="rb-rubric-pct">30%</div>
                      <div className="rb-rubric-title">Technical Execution</div>
                      <div className="rb-rubric-sub">Architecture, code quality, edge cases, and functional deployment.</div>
                    </div>
                    <div className="rb-rubric-card">
                      <div className="rb-rubric-pct">25%</div>
                      <div className="rb-rubric-title">Innovation & Novelty</div>
                      <div className="rb-rubric-sub">Uniqueness of the problem-solution angle and creative engineering.</div>
                    </div>
                    <div className="rb-rubric-card">
                      <div className="rb-rubric-pct">25%</div>
                      <div className="rb-rubric-title">Practical Utility</div>
                      <div className="rb-rubric-sub">Real-world applicability, market viability, and scalable impact.</div>
                    </div>
                    <div className="rb-rubric-card">
                      <div className="rb-rubric-pct">20%</div>
                      <div className="rb-rubric-title">Live Demo & Presentation</div>
                      <div className="rb-rubric-sub">Clarity of demo, UI polish, pitch communication, and jury Q&A.</div>
                    </div>
                  </div>
                </div>

                {/* Rules & Code of Conduct */}
                <div className="rb-section">
                  <div className="rb-section-title">
                    <ShieldCheck size={15} color="var(--purple)" />
                    <span>05. CODE OF CONDUCT & FAIR PLAY</span>
                  </div>
                  <ul className="rb-rules-list">
                    <li><b>Fresh Work Only:</b> All core application code must be committed during the 36-hour sprint. Pre-existing complete projects will be disqualified.</li>
                    <li><b>Open Source & Attribution:</b> Public libraries, frameworks, boilerplate setups, and foundational models are permitted with clear attribution in the README.</li>
                    <li><b>Zero Harassment Policy:</b> SAIT enforces a strict inclusive code of conduct. Any discrimination, harassment, or unsporting conduct will lead to immediate expulsion.</li>
                  </ul>
                </div>
              </div>
            ) : (
              /* Non-hackathon event overview */
              <div className="rulebook-body-sections">
                <div className="rb-section">
                  <div className="rb-section-title">
                    <FileText size={15} color="var(--purple)" />
                    <span>SESSION OVERVIEW & SPEAKER</span>
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--ink)' }}>
                    {event.speakers ? `Featured Speaker / Hosts: ${event.speakers}. ` : ''}
                    {event.description}
                  </p>
                </div>
                <div className="rb-section">
                  <div className="rb-section-title">
                    <Award size={15} color="var(--purple)" />
                    <span>ATTENDANCE & ACTIVITY POINTS</span>
                  </div>
                  <ul className="rb-rules-list">
                    <li>All attendees who check in with their digital pass will receive certified attendance credit.</li>
                    <li>Eligible for KTU/CUSAT Activity Points verification under SAIT departmental initiatives.</li>
                    <li>Please be seated at {event.venue} 10 minutes prior to {event.time}.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Bottom Sticky-like Switch to Registration CTA */}
            <div className="rulebook-bottom-cta">
              <div>
                <div style={{ fontWeight: 800, fontSize: '14px' }}>Ready to participate?</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Generate your official attendee QR pass in 30 seconds.</div>
              </div>
              <button 
                className="submit-btn" 
                style={{ padding: '10px 22px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                onClick={() => setActiveTab('register')}
                type="button"
              >
                <span>Get Digital Pass</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTRATION & DIGITAL PASS */}
        {activeTab === 'register' && (
          <div>
            {!registered ? (
              <div>
                <div className="eyebrow" style={{marginBottom:'6px'}}>REGISTRATION / SAIT PASS</div>
                <h2 style={{fontSize:'26px', margin:'0 0 10px', letterSpacing:'-0.03em'}}>{event.title}</h2>
                <p style={{fontSize:'13px', color:'var(--muted)', margin:'0 0 16px', lineHeight:'1.5'}}>
                  {event.description}
                </p>

                <div style={{display:'grid', gap:'8px', fontSize:'12px', background:'var(--paper)', padding:'14px', borderRadius:'6px', marginBottom:'18px'}}>
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

                {/* Link to rulebook */}
                <div style={{ marginBottom: '18px', textAlign: 'right' }}>
                  <button 
                    type="button"
                    onClick={() => setActiveTab('rulebook')}
                    style={{ background: 'none', border: 'none', color: 'var(--purple)', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}
                  >
                    <BookOpen size={13} /> View full rulebook & schedule
                  </button>
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
        )}
      </div>
    </div>
  );
}
