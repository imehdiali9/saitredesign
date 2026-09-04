import { useState } from 'react';
import { Download, BookOpen, ExternalLink, Mail, CheckCircle } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { faculty, academicResources } from '../data/data';

export default function About() {
  const [downloadNotice, setDownloadNotice] = useState(null);

  const handleDownload = (resource) => {
    setDownloadNotice(resource.title);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
  };

  return (
    <div className="page">
      {/* Page Hero */}
      <div className="page-hero">
        <div className="eyebrow">01 / ABOUT DEPARTMENT & SAIT</div>
        <h1>
          A department is more
          <br />
          than a timetable.
        </h1>
        <p>
          The Students Association of Information Technology (SAIT) is the student-facing
          layer of the Division of Information Technology at the School of Engineering,
          Cochin University of Science and Technology (CUSAT).
        </p>
      </div>

      {/* Vision & Mission (Official Section B Requirement) */}
      <section className="section manifesto">
        <Reveal>
          <div className="manifesto-big">
            Learn in public.
            <br />
            <span>Build together.</span>
          </div>
        </Reveal>
        <div className="manifesto-grid">
          <Reveal>
            <div>
              <b>OUR VISION</b>
              <p>
                To evolve into a premier center of excellence in Information Technology
                education and applied research, cultivating ethical engineers capable of
                solving complex systemic challenges and pioneering technological innovation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <b>OUR MISSION</b>
              <p>
                To provide high-quality undergraduate engineering curriculum coupled with
                state-of-the-art laboratory infrastructure, active student-led associations,
                industry-driven hackathons, and research mentorship that equips students with
                computational rigor and leadership capabilities.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Department & SAIT History Timeline (Official Section B Requirement) */}
      <section className="section history">
        <Reveal>
          <SectionHead
            eyebrow="02 / LEGACY & JOURNEY"
            title="Three decades of technical excellence."
            copy="Established under the School of Engineering at CUSAT, the Division of Information Technology has grown into one of Kerala's premier computing departments."
          />
        </Reveal>
        <div className="timeline">
          <Reveal>
            <div>
              <b>1995</b>
              <h3>Genesis</h3>
              <p>
                Division established at SOE CUSAT to nurture specialized software, networking,
                and system engineers in response to the emerging global computing revolution.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <b>2010s</b>
              <h3>SAIT Founded</h3>
              <p>
                Students Association of Information Technology was formalized to bridge the gap
                between theoretical coursework and industry practices through hackathons, talks,
                and workshops.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <b>2026+</b>
              <h3>Modern Era</h3>
              <p>
                A high-impact community with over 1,200 students, top national hackathon podiums,
                IEEE research publications, and an active global alumni network spanning FAANG and YC startups.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Faculty and Administration Directory (Official Section B Requirement) */}
      <section className="section faculty-section" id="faculty">
        <Reveal>
          <SectionHead
            eyebrow="03 / FACULTY & ADMINISTRATION"
            title="Mentors behind the department."
            copy="Meet our experienced professors, research scholars, and the dedicated staff coordinators who guide both academic progress and student association initiatives."
          />
        </Reveal>

        <div className="faculty-grid">
          {faculty.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.04}>
              <article className="faculty-card">
                <div>
                  <span className="faculty-tag">{f.tag}</span>
                  <h3>{f.name}</h3>
                  <div className="faculty-role">{f.role}</div>
                  <div className="faculty-area">
                    <b>Research:</b> {f.area}
                  </div>
                </div>

                <div className="faculty-contact">
                  <span>{f.office}</span>
                  <a href={`mailto:${f.email}`}>
                    <Mail size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {f.email}
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Academic Resources Hub (Official Section B Requirement) */}
      <section className="section academic-resources-section" id="resources">
        <Reveal>
          <SectionHead
            eyebrow="04 / ACADEMIC VAULT"
            title="Syllabus & academic resources."
            copy="Quick links to official B.Tech IT curriculum documents, verified lab manuals, past question archives, and KTU/CUSAT regulation sheets."
          />
        </Reveal>

        {downloadNotice && (
          <div className="submit-success-toast" style={{ marginTop: '20px' }}>
            <CheckCircle size={16} />
            <span>Document ready: <b>{downloadNotice}</b> has been accessed.</span>
          </div>
        )}

        <div className="academic-grid">
          {academicResources.map((res, i) => (
            <Reveal key={res.id} delay={i * 0.05}>
              <div className="academic-card">
                <div>
                  <div className="academic-meta">
                    <span>{res.category}</span>
                    <span className="academic-format">{res.format}</span>
                  </div>
                  <h3>{res.title}</h3>
                  <p>{res.description}</p>
                </div>

                <button
                  className="academic-download-btn"
                  onClick={() => handleDownload(res)}
                >
                  <Download size={14} /> Download {res.fileSize}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
