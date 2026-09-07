import { useState, useEffect, useRef } from 'react';
import {
  Upload, Link as LinkIcon, CheckCircle2, Clock3, Plus,
  ArrowUpRight, Award, ShieldCheck, Trophy, Sparkles, Filter,
  Trash2, FileText, X
} from 'lucide-react';
import Reveal from '../components/Reveal';
import { initialActivities, leaderboard } from '../data/data';

export default function Activity() {
  const [tab, setTab] = useState('submit');
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('sait_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  // Form states
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Hackathon');
  const [role, setRole] = useState('Participant');
  const [proofUrl, setProofUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submittedToast, setSubmittedToast] = useState(false);
  const fileInputRef = useRef(null);

  // Helper to format file sizes nicely
  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const handleAddFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const incoming = Array.from(fileList);
    setFiles((prev) => {
      const existingKeys = new Set(prev.map((f) => `${f.name}_${f.size}`));
      const unique = incoming.filter((f) => !existingKeys.has(`${f.name}_${f.size}`));
      return [...prev, ...unique];
    });
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleClearAllFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      handleAddFiles(e.dataTransfer.files);
    }
  };

  // History / Feed filter
  const [historyFilter, setHistoryFilter] = useState('All');

  // Save to localStorage when activities update
  useEffect(() => {
    localStorage.setItem('sait_activities', JSON.stringify(activities));
  }, [activities]);

  // Points calculation towards 100 points
  const verifiedPoints = activities
    .filter(a => a.status === 'Verified')
    .reduce((acc, curr) => acc + (curr.points || 0), 0);

  const pendingCount = activities.filter(a => a.status !== 'Verified').length;
  const verifiedCount = activities.filter(a => a.status === 'Verified').length;

  const pointsGoal = 100;
  const progressPercent = Math.min(100, Math.round((verifiedPoints / pointsGoal) * 100));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine estimated points based on category
    let pts = 15;
    if (type === 'Hackathon' || type === 'Competition') pts = 25;
    if (type === 'Publication') pts = 30;
    if (type === 'Workshop') pts = 15;
    if (type === 'Volunteering') pts = 10;

    const fileNames = files.map((f) => f.name);
    const newEntry = {
      id: Date.now(),
      name,
      type,
      role,
      date: date || new Date().toISOString().split('T')[0],
      status: 'Under Review',
      points: pts,
      proofFiles: fileNames,
      proofUrl: proofUrl || (fileNames.length > 0 ? fileNames.join(', ') : 'https://cusat.ac.in'),
      verifiedBy: 'Pending Faculty Review'
    };

    setActivities([newEntry, ...activities]);
    setSubmittedToast(true);

    // Reset inputs
    setName('');
    setDate('');
    setProofUrl('');
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setTimeout(() => {
      setSubmittedToast(false);
    }, 4500);
  };

  const filteredHistory = activities.filter(a => {
    if (historyFilter === 'All') return true;
    return a.status === historyFilter || a.type === historyFilter;
  });

  return (
    <div className="page activity-page">
      <div className="page-hero compact">
        <div className="eyebrow">07 / STUDENT ACTIVITY LOGGER</div>
        <h1>
          Your student life,
          <br />
          <span>in one trace.</span>
        </h1>
        <p>
          Submit technical and extracurricular participation, attach certificate proof,
          track faculty verification, and monitor your progress towards the mandatory
          KTU/CUSAT 100 activity points.
        </p>
      </div>

      <section className="section logger">
        {/* Navigation Tabs */}
        <div className="logger-tabs">
          <button
            className={tab === 'submit' ? 'selected' : ''}
            onClick={() => setTab('submit')}
          >
            Submit Activity
          </button>
          <button
            className={tab === 'history' ? 'selected' : ''}
            onClick={() => setTab('history')}
          >
            My Activity History ({activities.length})
          </button>
          <button
            className={tab === 'leaderboard' ? 'selected' : ''}
            onClick={() => setTab('leaderboard')}
          >
            Department Leaderboard
          </button>
        </div>

        {/* Tab 1: Submit Activity View */}
        {tab === 'submit' && (
          <div className="logger-grid">
            <Reveal>
              <form className="activity-form" onSubmit={handleSubmit}>
                <div className="form-top">
                  <span>ACTIVITY SUBMISSION / PORTAL</span>
                  <span>ODD SEMESTER 2026</span>
                </div>

                {submittedToast && (
                  <div className="submit-success-toast">
                    <CheckCircle2 size={18} />
                    <span style={{ flex: 1 }}>
                      Activity recorded! Sent to SAIT Faculty Verification Cell.{' '}
                      <button
                        type="button"
                        onClick={() => setTab('history')}
                        style={{
                          display: 'inline',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: 'var(--purple)',
                          fontWeight: 700,
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}
                      >
                        View in History →
                      </button>
                    </span>
                  </div>
                )}

                <label>
                  Activity / Event Name
                  <input
                    required
                    placeholder="e.g. Ignite Hackathon 2026 or IEEE National Conference"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <div className="form-row">
                  <label>
                    Date of Event
                    <input
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                  <label>
                    Activity Type
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Competition">Technical Competition</option>
                      <option value="Publication">Research Publication</option>
                      <option value="Workshop">Technical Workshop</option>
                      <option value="Volunteering">Department Volunteering</option>
                      <option value="Community">Community Leadership</option>
                    </select>
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Your Role / Standing
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                      <option>Team Lead</option>
                      <option>Participant</option>
                      <option>1st / 2nd Prize Winner</option>
                      <option>Primary Author</option>
                      <option>Keynote Speaker</option>
                      <option>Organizing Committee Volunteer</option>
                    </select>
                  </label>

                  <div className="proof-upload-field">
                    <label htmlFor="certificate-file-input">
                      Certificate Proof Files
                      {files.length > 0 && (
                        <span className="proof-count-badge">
                          {files.length} attached
                        </span>
                      )}
                    </label>

                    <div
                      className={`upload-dropzone ${isDragging ? 'is-dragging' : ''}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                    >
                      <Upload size={18} color="var(--purple)" />
                      <span className="dropzone-text">
                        {files.length === 0
                          ? 'Drop certificate files or click to browse'
                          : '+ Add more certificate files'}
                      </span>
                      <span className="dropzone-sub">
                        PDF, PNG, JPG accepted (multiple allowed)
                      </span>
                      <input
                        id="certificate-file-input"
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.png,.jpg,.jpeg"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleAddFiles(e.target.files);
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>

                    {files.length > 0 && (
                      <div className="selected-files-box">
                        <div className="selected-files-header">
                          <span>Attached Files ({files.length})</span>
                          <button
                            type="button"
                            className="clear-files-btn"
                            onClick={handleClearAllFiles}
                          >
                            Clear all
                          </button>
                        </div>
                        <div className="selected-files-list">
                          {files.map((file, idx) => (
                            <div className="selected-file-item" key={`${file.name}-${file.size}-${idx}`}>
                              <div className="file-item-info">
                                <FileText size={15} className="file-item-icon" />
                                <div className="file-item-text">
                                  <span className="file-item-name" title={file.name}>
                                    {file.name}
                                  </span>
                                  <span className="file-item-size">
                                    {formatBytes(file.size)}
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="file-delete-btn"
                                title={`Delete ${file.name}`}
                                aria-label={`Delete ${file.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFile(idx);
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <label>
                  Live Proof URL / Verification Link
                  <div className="link-input">
                    <LinkIcon size={16} color="var(--purple)" />
                    <input
                      placeholder="https://github.com/... or IEEE DOI or organizer site"
                      value={proofUrl}
                      onChange={(e) => setProofUrl(e.target.value)}
                    />
                  </div>
                </label>

                <button className="submit-btn" type="submit">
                  Submit Activity for Faculty Verification <ArrowUpRight size={17} />
                </button>
              </form>
            </Reveal>

            {/* Right Aside: 100 Activity Points Progress & Guide */}
            <Reveal delay={0.1}>
              <div className="logger-aside">
                {/* 100 Activity Points Gauge */}
                <div className="trace-card">
                  <div className="eyebrow" style={{ color: 'var(--lime)' }}>
                    CUSAT / KTU 100 ACTIVITY POINTS
                  </div>
                  <div className="trace-score">
                    {verifiedPoints}
                    <small style={{ fontSize: '32px', color: '#a9afb8', fontWeight: 400 }}>
                      /100
                    </small>
                  </div>
                  <p>Verified Activity Points Earned</p>

                  <div className="trace-line">
                    <span style={{ width: `${progressPercent}%` }} />
                  </div>

                  <div className="trace-meta">
                    <span>{progressPercent}% Requirement Met</span>
                    <span>{verifiedCount} Verified · {pendingCount} Pending</span>
                  </div>
                </div>

                {/* Points Allotment Guide */}
                <div className="points-guide">
                  <h4>
                    <Award size={16} color="var(--purple)" /> Points Allotment Reference
                  </h4>
                  <div className="points-table">
                    <div className="points-row">
                      <span>National Hackathon Winner</span>
                      <b>+50 pts</b>
                    </div>
                    <div className="points-row">
                      <span>IEEE Paper Publication</span>
                      <b>+40 pts</b>
                    </div>
                    <div className="points-row">
                      <span>Hackathon Participation</span>
                      <b>+25 pts</b>
                    </div>
                    <div className="points-row">
                      <span>Technical Workshop (2+ Days)</span>
                      <b>+15 pts</b>
                    </div>
                    <div className="points-row">
                      <span>Department Event Volunteering</span>
                      <b>+10 pts</b>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* Tab 2: Activity History View */}
        {tab === 'history' && (
          <div className="history">
            <div className="history-summary">
              <b>{activities.length}</b>
              <span>total submitted student activities</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {['All', 'Verified', 'Under Review', 'Hackathon', 'Publication', 'Workshop'].map((f) => (
                <button
                  key={f}
                  onClick={() => setHistoryFilter(f)}
                  style={{
                    border: '1px solid var(--line)',
                    background: historyFilter === f ? 'var(--ink)' : 'transparent',
                    color: historyFilter === f ? '#fff' : 'var(--ink)',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {filteredHistory.map((item) => (
              <div className="history-row" key={item.id}>
                <span className="history-dot" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <b style={{ fontSize: '14px' }}>{item.name}</b>
                    <span className="tag" style={{ fontSize: '8px' }}>{item.type}</span>
                    {item.proofFiles && item.proofFiles.length > 0 && (
                      <span
                        className="tag"
                        style={{
                          fontSize: '8px',
                          background: 'rgba(111, 63, 251, 0.08)',
                          color: 'var(--purple)',
                          borderColor: 'rgba(111, 63, 251, 0.25)'
                        }}
                      >
                        {item.proofFiles.length} file{item.proofFiles.length > 1 ? 's' : ''} attached
                      </span>
                    )}
                  </div>
                  <small>
                    Role: {item.role} · Verified By: {item.verifiedBy}
                  </small>
                </div>
                <span className={`status ${item.status === 'Verified' ? 'green' : 'orange'}`}>
                  {item.status}
                </span>
                <span style={{ font: "500 11px 'DM Mono'", color: 'var(--purple)' }}>
                  +{item.points} pts
                </span>
                <span style={{ font: "500 10px 'DM Mono'", color: 'var(--muted)' }}>
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Department Leaderboard */}
        {tab === 'leaderboard' && (
          <div>
            <div className="history-summary">
              <b>TOP BUILDERS</b>
              <span>Department Activity & Contribution Leaderboard</span>
            </div>

            <div className="leaderboard-table">
              <div
                className="leaderboard-row"
                style={{ font: "500 10px 'DM Mono'", color: 'var(--muted)', paddingBottom: '10px' }}
              >
                <span>RANK</span>
                <span>STUDENT</span>
                <span>BATCH</span>
                <span>POINTS</span>
                <span>BADGE</span>
              </div>

              {leaderboard.map((user) => (
                <div className="leaderboard-row" key={user.rank}>
                  <div className={`rank-badge rank-${user.rank}`}>
                    {user.rank}
                  </div>
                  <div>
                    <b style={{ fontSize: '15px' }}>{user.name}</b>
                    <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                      {user.activities} verified activities
                    </div>
                  </div>
                  <span style={{ font: "500 11px 'DM Mono'" }}>{user.batch}</span>
                  <span style={{ font: "700 15px 'DM Mono'", color: 'var(--purple)' }}>
                    {user.points} pts
                  </span>
                  <span className="tag flagship">{user.badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
