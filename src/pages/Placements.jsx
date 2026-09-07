import { useState } from 'react';
import { ArrowUpRight, TrendingUp, Download, CheckCircle, FileText } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { placementStats, recruiters, careerResources } from '../data/data';

export default function Placements() {
  const [downloadedResource, setDownloadedResource] = useState(null);

  const handleResourceClick = (res) => {
    const content = `=====================================================
SAIT CAREER & PLACEMENT TOOLKIT
${res.title}
Badge: ${res.badge}
-----------------------------------------------------
Guide Overview:
${res.desc}

Curated by SAIT Tech & Placements Cell
School of Engineering, CUSAT
Inquiries: itdept@cusat.ac.in | https://saitcusat.in
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(res.title || 'Career_Resource').replace(/[^a-zA-Z0-9]/g, '_')}_Guide.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadedResource(res.title);
    setTimeout(() => setDownloadedResource(null), 3500);
  };

  return (
    <div className="page">
      <div className="page-hero compact">
        <div className="eyebrow">04 / PLACEMENTS & CAREERS</div>
        <h1>
          From first build
          <br />
          to first offer.
        </h1>
        <p>
          Career placement statistics, top recruiting companies, and curated preparation
          resources without turning the page into an unreadable spreadsheet.
        </p>
      </div>

      {/* Placement Statistics (Official Section E Requirement) */}
      <section className="section">
        <Reveal>
          <SectionHead
            eyebrow="METRICS / 2025—2026 SEASON"
            title="Consistently strong outcomes."
            copy="Our engineering students work across top product engineering firms, cloud leaders, and high-impact fintech organizations."
          />
        </Reveal>

        <div className="placement-metrics" style={{ marginTop: '35px' }}>
          <Reveal>
            <div className="placement-big">
              <span>AVERAGE PLACEMENT RATE</span>
              <strong>{placementStats.placementRate}</strong>
              <p>Verified placement rate for eligible graduating IT batch.</p>
            </div>
          </Reveal>

          <div className="placement-side">
            <Reveal>
              <div>
                <b>{placementStats.highestPackage}</b>
                <span>Highest Package Offered</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <b>{placementStats.averagePackage}</b>
                <span>Average CTC Package</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <b>{placementStats.recruitersCount}</b>
                <span>Recruiting Companies On-Campus</span>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <b>{placementStats.totalOffers}</b>
                <span>Total Offers Extended</span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Sector Breakdown */}
        <div className="sector-breakdown">
          <div className="sector-grid">
            {placementStats.sectors.map((sec, i) => (
              <Reveal key={sec.label} delay={i * 0.04}>
                <div className="sector-card">
                  <b>{sec.percentage}</b>
                  <span>{sec.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter / Company Information (Official Section E Requirement) */}
      <section className="section">
        <Reveal>
          <SectionHead
            eyebrow="RECRUITING PARTNERS"
            title="Where students build next."
            copy="Regular campus recruiters hiring from the Division of Information Technology, SOE CUSAT."
          />
        </Reveal>

        <div className="logo-wall">
          {recruiters.map((r) => (
            <div className="logo-card" key={r.name}>
              <strong>{r.name}</strong>
              <span>{r.category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Career & Placement Resources (Official Section E Requirement) */}
      <section className="section resources">
        <Reveal>
          <SectionHead
            eyebrow="CAREER TOOLKIT"
            title="Curated before the interview."
            copy="Tested preparation roadmaps, ATS resume templates, and senior interview debriefs curated by the SAIT Tech Team."
          />
        </Reveal>

        {downloadedResource && (
          <div className="submit-success-toast" style={{ marginTop: '20px' }}>
            <CheckCircle size={16} />
            <span>Resource accessed: <b>{downloadedResource}</b>. Good luck with prep!</span>
          </div>
        )}

        <div className="resource-grid">
          {careerResources.map((res, i) => (
            <Reveal key={res.id} delay={i * 0.05}>
              <div
                className="resource-card"
                onClick={() => handleResourceClick(res)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleResourceClick(res);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Access ${res.title}`}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>0{i + 1}</span>
                    <span className="tag">{res.badge}</span>
                  </div>
                  <h3>{res.title}</h3>
                  <p>{res.desc}</p>
                </div>
                <ArrowUpRight size={18} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
