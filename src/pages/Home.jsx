import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, CalendarDays, Users, Sparkles, BookOpen } from 'lucide-react';
import { motion, useMotionValue, useSpring, useInView, useScroll, useTransform, animate } from 'framer-motion';
import { events, notices, achievements } from '../data/data';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import Stat from '../components/Stat';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import HackathonCountdown from '../components/HackathonCountdown';

function Magnetic({ children, to }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18 });
  const sy = useSpring(y, { stiffness: 300, damping: 18 });

  return (
    <Link
      to={to}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.15);
        y.set((e.clientY - r.top - r.height / 2) * 0.15);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.span style={{ x: sx, y: sy }} className="magnetic-inner">
        {children}
      </motion.span>
    </Link>
  );
}

function ActivityGraph({ onEventClick, eventsData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-60px 0px" });

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.8, ease: "easeInOut" }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: custom,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    })
  };

  const lineVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (custom) => ({
      opacity: 1,
      pathLength: 1,
      transition: { delay: custom, duration: 0.4 }
    })
  };

  const calloutVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom + 0.1, duration: 0.3 }
    })
  };

  const yGridLines = [
    { pts: "100 PTS", y: 35 },
    { pts: "75 PTS", y: 80 },
    { pts: "50 PTS", y: 125 },
    { pts: "25 PTS", y: 170 },
    { pts: "0 PTS", y: 215 }
  ];

  const xMarkers = [
    { label: "SEM 1", x: 100 },
    { label: "SEM 2", x: 200 },
    { label: "SEM 3", x: 310 },
    { label: "SEM 4", x: 420 },
    { label: "SEM 5", x: 510 },
    { label: "SEM 6+", x: 580 }
  ];

  const milestones = [
    {
      x: 180,
      y: 175,
      dropY: 215,
      leaderTopY: 148,
      rectX: 115,
      rectY: 124,
      rectW: 130,
      rectH: 24,
      textX: 180,
      textY: 140,
      label: "TECH TALK (+10)",
      delay: 0.9,
      event: eventsData[1]
    },
    {
      x: 370,
      y: 100,
      dropY: 215,
      leaderTopY: 72,
      rectX: 285,
      rectY: 48,
      rectW: 170,
      rectH: 24,
      textX: 370,
      textY: 64,
      label: "IGNITE HACKATHON (+25)",
      delay: 1.3,
      event: eventsData[0]
    },
    {
      x: 560,
      y: 35,
      dropY: 215,
      leaderTopY: 35,
      rectX: 405,
      rectY: 23,
      rectW: 145,
      rectH: 24,
      textX: 477,
      textY: 39,
      label: "★ 100 PTS COMPLETE",
      isGoal: true,
      delay: 1.7,
      event: eventsData[3] || eventsData[0]
    }
  ];

  return (
    <div className="graph" ref={ref}>
      <svg viewBox="0 0 640 260" preserveAspectRatio="none">
        {/* Horizontal Gridlines & Y-Axis Labels */}
        {yGridLines.map((grid) => (
          <g key={grid.pts}>
            <line
              x1="65"
              y1={grid.y}
              x2="615"
              y2={grid.y}
              stroke="rgba(255, 255, 255, 0.09)"
              strokeDasharray="3 4"
            />
            <text
              x="58"
              y={grid.y + 3.5}
              textAnchor="end"
              fill="rgba(255, 255, 255, 0.45)"
              fontSize="9"
              fontFamily="'DM Mono', monospace"
              letterSpacing="0.05em"
            >
              {grid.pts}
            </text>
          </g>
        ))}

        {/* X-Axis Baseline & Semester Markers */}
        <line x1="65" y1="215" x2="615" y2="215" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        {xMarkers.map((m) => (
          <g key={m.label}>
            <line x1={m.x} y1="215" x2={m.x} y2="220" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
            <text
              x={m.x}
              y="234"
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.4)"
              fontSize="9"
              fontFamily="'DM Mono', monospace"
              letterSpacing="0.08em"
            >
              {m.label}
            </text>
          </g>
        ))}

        {/* Trajectory Curve */}
        <motion.path
          d="M 65 215 C 100 214, 140 195, 180 175 C 220 155, 250 175, 290 160 C 330 145, 345 115, 370 100 C 405 80, 440 105, 480 75 C 515 50, 535 38, 560 35"
          variants={pathVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          stroke="#d9ff4a"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Leader Lines, Milestone Dots & Connected Milestone Callouts */}
        {milestones.map((m) => (
          <g key={m.label} className="milestone-group">
            {/* Vertical drop line down to X axis */}
            <motion.line
              x1={m.x}
              y1={m.y}
              x2={m.x}
              y2={m.dropY}
              stroke="rgba(217, 255, 74, 0.35)"
              strokeDasharray="2 3"
              strokeWidth="1.2"
              variants={lineVariants}
              custom={m.delay}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />

            {/* Vertical leader line to callout badge */}
            <motion.line
              x1={m.x}
              y1={m.y}
              x2={m.isGoal ? m.rectX + m.rectW : m.x}
              y2={m.isGoal ? m.rectY + m.rectH / 2 : m.leaderTopY}
              stroke="rgba(217, 255, 74, 0.6)"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              variants={lineVariants}
              custom={m.delay}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />

            {/* Curve Milestone Node */}
            <motion.circle
              cx={m.x}
              cy={m.y}
              r="5.5"
              fill="#d9ff4a"
              stroke="#181226"
              strokeWidth="2"
              variants={dotVariants}
              custom={m.delay}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.8, cursor: "pointer" }}
              onClick={() => onEventClick(m.event)}
            />

            {/* Connected Callout Badge */}
            <motion.g
              variants={calloutVariants}
              custom={m.delay}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="chart-callout"
              onClick={() => onEventClick(m.event)}
            >
              <rect
                x={m.rectX}
                y={m.rectY}
                width={m.rectW}
                height={m.rectH}
                rx="6"
                fill={m.isGoal ? "rgba(217, 255, 74, 0.15)" : "#221a38"}
                stroke={m.isGoal ? "#d9ff4a" : "rgba(110, 86, 207, 0.6)"}
                strokeWidth="1"
              />
              <text
                x={m.textX}
                y={m.textY}
                textAnchor="middle"
                fill={m.isGoal ? "#d9ff4a" : "#f1edfa"}
                fontSize="9"
                fontWeight={m.isGoal ? "700" : "500"}
                fontFamily="'DM Mono', monospace"
                letterSpacing="0.08em"
              >
                {m.label}
              </text>
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  );
}
function FormingWord({ word, delay = 0, isOutlined = false, wordIndex = 0 }) {
  const letters = word.split('');
  const glyphs = '01#$&*+~<>[]_//X';
  const [displayChars, setDisplayChars] = useState(() => letters);

  // Stagger delays for ambient wave on mobile (cycle restarts every ~5.5s)
  const wordBaseDelays = [0, 0.65, 1.75];
  const baseDelay = wordBaseDelays[wordIndex] || 0;

  useEffect(() => {
    const timeouts = [];
    const intervals = [];

    letters.forEach((targetChar, index) => {
      const charDelay = delay * 1000 + index * 55;

      const t = setTimeout(() => {
        let cycles = 0;
        const maxCycles = 5 + Math.floor(Math.random() * 3);

        const interval = setInterval(() => {
          cycles++;
          if (cycles >= maxCycles) {
            clearInterval(interval);
            setDisplayChars(prev => {
              const next = [...prev];
              next[index] = targetChar;
              return next;
            });
          } else {
            setDisplayChars(prev => {
              const next = [...prev];
              next[index] = glyphs[Math.floor(Math.random() * glyphs.length)];
              return next;
            });
          }
        }, 32);

        intervals.push(interval);
      }, charDelay);

      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [word, delay]);

  return (
    <span className={`forming-word ${isOutlined ? 'outlined' : ''}`}>
      {letters.map((_, i) => (
        <motion.span
          key={i}
          className="forming-char"
          style={{
            '--char-wave-delay': `${(baseDelay + i * 0.08).toFixed(2)}s`
          }}
          initial={{ opacity: 0, y: 44, rotateX: -60, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.045,
            ease: [0.16, 1, 0.3, 1]
          }}
          whileHover={{ 
            y: -5, 
            scale: 1.05, 
            transition: { duration: 0.2 } 
          }}
        >
          {displayChars[i]}
        </motion.span>
      ))}
    </span>
  );
}

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      {/* Section A: Hero */}
      <section className="hero">
        <div className="hero-grid" />

        {/* Left Column: Main Card & SAIT Intro */}
        <div className="hero-left hero-intro-col">
          <motion.div 
            className="eyebrow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            SAIT / DIVISION OF INFORMATION TECHNOLOGY / SOE CUSAT
          </motion.div>
          <h1 className="hero-forming-heading">
            <FormingWord word="Build." delay={0.12} wordIndex={0} />
            <FormingWord word="Participate." delay={0.44} wordIndex={1} />
            <FormingWord word="Achieve." delay={0.88} isOutlined={true} wordIndex={2} />
          </h1>
          <motion.p 
            className="hero-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            The student layer connecting CUSAT's IT community — flagship hackathons,
            faculty guidance, verified student activity tracking, and career opportunities
            happening between lectures.
          </motion.p>
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic to="/events">
              Explore Events <ArrowUpRight size={17} />
            </Magnetic>
            <Link className="hero-secondary-btn" to="/activity">
              Log your activity points <ArrowUpRight size={16} />
            </Link>
          </motion.div>

          <motion.div 
            className="mini-grid hero-mini-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/events">
              <CalendarDays />
              <span>
                Upcoming
                <br />
                <b>events & talks</b>
              </span>
            </Link>
            <Link to="/about">
              <BookOpen />
              <span>
                Faculty &
                <br />
                <b>syllabus hub</b>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Hackathon Showcase & Live Countdown Timer */}
        <motion.div 
          className="hero-right hero-hackathon-col"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <HackathonCountdown
            event={events[0]}
            onRegister={(ev) => setSelectedEvent(ev)}
            onDetails={(ev) => setSelectedEvent(ev)}
          />
        </motion.div>

        <div className="scroll-cue">
          <ArrowDown size={14} /> SCROLL TO EXPLORE
        </div>
      </section>

      {/* Ticker Strip */}
      <div className="ticker">
        <div className="ticker-track">
          {Array(2)
            .fill([
              'DIVISION OF IT',
              'SOE CUSAT',
              'IGNITE HACKATHON',
              'STUDENT ACTIVITY LOGGER',
              '100 ACTIVITY POINTS',
              'TECH & MEDIA TEAMS',
              'CAMPUS PLACEMENTS',
              'ALUMNI NETWORK',
              'HALL OF FAME'
            ])
            .flat()
            .map((x, i) => (
              <span key={i}>
                {x} <i>✳</i>
              </span>
            ))}
        </div>
      </div>

      {/* Key Statistics Strip */}
      <section className="stats-strip">
        {[
          ['1,200+', 'IT students across all active batches'],
          ['40+', 'technical & community events per year'],
          ['85%', 'average placement rate across top firms'],
          ['60+', 'hackathon & competition national wins']
        ].map(([v, l]) => (
          <Stat key={v} value={v} label={l} />
        ))}
      </section>

      {/* Events Spotlight */}
      <section className="section events-home">
        <Reveal>
          <SectionHead
            eyebrow="02 / WHAT'S HAPPENING"
            title="Don't miss the next build."
            copy="A live calendar for the hackathons, workshops, research talks, and community sessions that make the department feel like a family."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="event-feature">
            <div className="events-list-stack">
              {[events[1], events[3], events[4]].map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  onRegister={() => setSelectedEvent(ev)}
                />
              ))}
            </div>
            <div className="event-side">
              <div className="side-note">
                <Sparkles size={18} />
                <span>SAIT PICKS</span>
                <p>Hands-on engineering, systems research talks, and inter-batch code sprints.</p>
              </div>
              <Link to="/events" className="boxed-link">
                View full calendar ({events.length} events) <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Activity Logger Teaser */}
      <section className="section activity-tease">
        <Reveal>
          <div className="activity-panel">
            <div className="activity-copy">
              <div className="eyebrow">03 / YOUR TRACE</div>
              <h2>
                Make your work
                <br />
                <em>count.</em>
              </h2>
              <p>
                Log your hackathon wins, research papers, workshops, and volunteering.
                Track your KTU/CUSAT 100 activity points progress with instant verification
                and an official verifiable record.
              </p>
              <Link className="dark-link" to="/activity">
                Open Activity Logger <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="activity-graph">
              <div className="graph-label">ACTIVITY POINT TRAJECTORY / 2024—2026</div>
              <ActivityGraph onEventClick={setSelectedEvent} eventsData={events} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Latest Notices & Hall of Fame Highlight */}
      <section className="section split-section">
        <Reveal>
          <SectionHead
            eyebrow="04 / LATEST"
            title="A department that keeps moving."
          />
        </Reveal>
        <div className="latest-grid">
          <Reveal>
            <div className="notice-stack">
              {notices.slice(0, 4).map((n) => (
                <Link to="/notices" className="notice-row" key={n.id}>
                  <b>{n.id}</b>
                  <span>{n.title}</span>
                  <small>{n.date}</small>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="achievement-highlight">
              <div>
                <div className="eyebrow" style={{ color: 'var(--lime)' }}>HALL OF FAME SPOTLIGHT</div>
                <div className="big-year">{achievements[0].year}</div>
                <h3>{achievements[0].title}</h3>
                <p>{achievements[0].detail}</p>
              </div>
              <Link to="/achievements">
                Explore all department honors <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Event Registration Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
