import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  X, CheckCircle, Calendar, MapPin, Download, BookOpen, 
  Ticket, Trophy, Clock, Users, ShieldCheck, Award, ArrowRight,
  FileText, Sparkles, Flame, Check, QrCode as QrIcon
} from 'lucide-react';

export default function EventModal({ event, initialTab = 'register', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [batch, setBatch] = useState('S5 IT');
  const [registered, setRegistered] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
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

  // Generate genuine scannable QR Code whenever registration succeeds
  useEffect(() => {
    if (registered && ticketId && event) {
      const verifyUrl = `https://saitcusat.vercel.app/activity?pass=${ticketId}&event=${encodeURIComponent(event.title || '')}&name=${encodeURIComponent(name || '')}`;
      QRCode.toDataURL(verifyUrl, {
        width: 300,
        margin: 1,
        errorCorrectionLevel: 'M',
        color: {
          dark: '#0a0d14',
          light: '#ffffff'
        }
      }).then((url) => {
        setQrDataUrl(url);
      }).catch((err) => {
        console.error('Failed to generate pass QR code', err);
      });
    }
  }, [registered, ticketId, event, name]);

  if (!event) return null;

  const isHackathon = event.category === 'Hackathon' || event.title?.toLowerCase().includes('hackathon');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = 'SAIT-2026-' + Math.floor(1000 + Math.random() * 9000);
    setTicketId(id);
    setRegistered(true);
  };

  const handleDownloadJpg = async () => {
    if (!ticketId || !event) return;

    try {
      const canvas = document.createElement('canvas');
      const width = 1000;
      const height = 520;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Dark Premium Ticket Background
      ctx.fillStyle = '#0a0d14';
      ctx.fillRect(0, 0, width, height);

      // Radial purple ambient glow
      const glow = ctx.createRadialGradient(820, 110, 10, 820, 110, 480);
      glow.addColorStop(0, 'rgba(111, 63, 251, 0.32)');
      glow.addColorStop(1, 'rgba(10, 13, 20, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Card outer border
      ctx.strokeStyle = '#272e3d';
      ctx.lineWidth = 3;
      ctx.strokeRect(1.5, 1.5, width - 3, height - 3);

      // 2. Top Header Bar
      ctx.fillStyle = '#111622';
      ctx.fillRect(3, 3, width - 6, 68);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 13.5px "DM Mono", monospace';
      ctx.fillText('SAIT OFFICIAL ATTENDEE PASS · DIVISION OF IT, SOE CUSAT', 38, 42);

      ctx.fillStyle = '#d9ff4a';
      ctx.font = '700 16px "DM Mono", monospace';
      const idText = `PASS ID: ${ticketId}`;
      const idWidth = ctx.measureText(idText).width;
      ctx.fillText(idText, width - 38 - idWidth, 42);

      // Header bottom border
      ctx.strokeStyle = '#242b3a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(3, 71);
      ctx.lineTo(width - 3, 71);
      ctx.stroke();

      // 3. Category Tag Pill
      const tagText = (event.category || 'EVENT PASS').toUpperCase();
      ctx.font = '700 12px "DM Mono", monospace';
      const tagW = ctx.measureText(tagText).width;
      const pillX = 38;
      const pillY = 100;
      const pillW = tagW + 22;
      const pillH = 26;

      ctx.fillStyle = 'rgba(111, 63, 251, 0.22)';
      ctx.strokeStyle = '#7c3aed';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(pillX, pillY, pillW, pillH, 13);
      } else {
        ctx.rect(pillX, pillY, pillW, pillH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#c4b5fd';
      ctx.fillText(tagText, pillX + 11, pillY + 17);

      // 4. Event Title
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 34px "Manrope", system-ui, sans-serif';
      let titleStr = event.title || 'Ignite Hackathon 2026';
      if (ctx.measureText(titleStr).width > 620) {
        while (ctx.measureText(titleStr + '...').width > 620 && titleStr.length > 0) {
          titleStr = titleStr.slice(0, -1);
        }
        titleStr += '...';
      }
      ctx.fillText(titleStr, 38, 170);

      // 5. Attendee Credentials
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 22px "Manrope", system-ui, sans-serif';
      ctx.fillText(name || 'Participant Attendee', 38, 218);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 15px "DM Mono", monospace';
      ctx.fillText(`Reg No: ${regNo || 'Pending'} · Batch: ${batch || 'IT Batch'}`, 38, 248);

      // 6. Schedule & Venue Details
      ctx.fillStyle = '#d9ff4a';
      ctx.font = '700 17px "Manrope", system-ui, sans-serif';
      ctx.fillText(`📅 ${event.day} ${event.month} 2026 (${event.time || 'Schedule'})  ·  📍 ${event.venue || 'SOE CUSAT'}`, 38, 296);

      // 7. Verification / Admission Line
      ctx.strokeStyle = '#222938';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(38, 332);
      ctx.lineTo(660, 332);
      ctx.stroke();

      ctx.fillStyle = '#22c55e';
      ctx.font = '700 13px "DM Mono", monospace';
      ctx.fillText('● STATUS: VERIFIED ADMISSION', 38, 362);

      ctx.fillStyle = '#64748b';
      ctx.font = '500 11.5px "DM Mono", monospace';
      ctx.fillText('Official attendee credential. Present QR barcode at venue entry desk.', 38, 388);
      ctx.fillText('Issued by Students Association of Information Technology (SAIT CUSAT)', 38, 410);

      // 8. Functional Barcode Graphic Strip (Code 128 styling)
      const barX = 38;
      const barY = 435;
      const barH = 34;
      const bars = [3, 1, 2, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 3, 2, 4, 1, 2, 3, 5, 1, 4, 2, 3, 1, 4, 2, 3, 1, 2, 4, 5, 1, 3, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 5, 2, 4];
      let runningX = barX;
      ctx.fillStyle = '#94a3b8';
      for (let i = 0; i < bars.length; i++) {
        if (i % 2 === 0) {
          ctx.fillRect(runningX, barY, bars[i], barH);
        }
        runningX += bars[i] + 1;
      }
      ctx.font = '600 11px "DM Mono", monospace';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`*${ticketId}*`, barX + 90, barY + barH + 16);

      // 9. QR Code Container Box
      const qrBoxX = 705;
      const qrBoxY = 100;
      const qrBoxSize = 255;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize + 60, 12);
      } else {
        ctx.rect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize + 60);
      }
      ctx.fill();
      ctx.strokeStyle = '#384254';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Ensure QR Code Image is rendered onto canvas
      const verifyUrl = `https://saitcusat.vercel.app/activity?pass=${ticketId}&event=${encodeURIComponent(event.title || '')}&name=${encodeURIComponent(name || '')}`;
      const urlForCanvas = qrDataUrl || await QRCode.toDataURL(verifyUrl, {
        width: 320,
        margin: 1,
        errorCorrectionLevel: 'M',
        color: { dark: '#0a0d14', light: '#ffffff' }
      });

      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      qrImg.onload = () => {
        // Draw scannable QR Code
        ctx.drawImage(qrImg, qrBoxX + 17.5, qrBoxY + 16, 220, 220);

        // QR Code captions
        ctx.fillStyle = '#0a0d14';
        ctx.font = '800 11.5px "DM Mono", monospace';
        const c1 = 'SCAN TO VERIFY PASS';
        const w1 = ctx.measureText(c1).width;
        ctx.fillText(c1, qrBoxX + (qrBoxSize - w1) / 2, qrBoxY + 256);

        ctx.fillStyle = '#64748b';
        ctx.font = '600 9.5px "DM Mono", monospace';
        const c2 = 'OFFICIAL EVENT ADMISSION';
        const w2 = ctx.measureText(c2).width;
        ctx.fillText(c2, qrBoxX + (qrBoxSize - w2) / 2, qrBoxY + 274);

        // Convert canvas to JPG blob and trigger download
        canvas.toBlob((blob) => {
          if (!blob) return;
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `SAIT_Pass_${ticketId}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(downloadUrl);

          setDownloaded(true);
          setTimeout(() => setDownloaded(false), 3000);
        }, 'image/jpeg', 0.95);
      };
      qrImg.src = urlForCanvas;
    } catch (err) {
      console.error('Error generating pass JPG:', err);
    }
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

                    <div className="ticket-qr" title="Real scannable attendee QR code">
                      {qrDataUrl ? (
                        <img
                          src={qrDataUrl}
                          alt={`QR Code Pass for ${name}`}
                          style={{
                            width: '84px',
                            height: '84px',
                            display: 'block',
                            background: '#ffffff',
                            borderRadius: '4px',
                            padding: '3px'
                          }}
                        />
                      ) : (
                        <div style={{ width: '84px', height: '84px', background: '#ffffff', borderRadius: '4px' }} />
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0 16px', padding: '0 4px', fontSize: '11px', color: 'var(--muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <QrIcon size={13} color="var(--purple)" /> Scannable with any phone camera
                  </span>
                  <span style={{ font: "600 10px 'DM Mono'", color: 'var(--purple)' }}>
                    HIGH-RES JPG EXPORT
                  </span>
                </div>

                <div style={{display:'flex', gap:'12px', marginTop:'12px'}}>
                  <button
                    className="submit-btn"
                    style={{flex:1, padding:'12px'}}
                    onClick={handleDownloadJpg}
                  >
                    {downloaded ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={15}/> Pass Downloaded (.JPG)!
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Download size={15}/> Download Pass (.JPG)
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
