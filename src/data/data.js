// SAIT Data Store — Official Redesign Specification

export const events = [
  {
    id: 1,
    day: '18',
    month: 'OCT',
    title: 'Ignite Hackathon 2026',
    time: '9:00 AM – 36 Hours',
    venue: 'Main Auditorium, SOE CUSAT',
    category: 'Hackathon',
    flagship: true,
    accent: 'lime',
    fee: 'Free for CUSAT students',
    prizePool: '₹50,000',
    description: 'The premier annual 36-hour hackathon by SAIT. Build hardware or software prototypes tackling real-world problems in climate, health, and AI.',
    speakers: 'Keynote by Maya Nair (Cisco) & Industry Jury'
  },
  {
    id: 2,
    day: '07',
    month: 'NOV',
    title: 'TechTalk: Systems at Scale',
    time: '2:30 PM – 4:30 PM',
    venue: 'Seminar Hall 2, IT Block',
    category: 'Talk',
    flagship: false,
    accent: 'purple',
    fee: 'Open to All',
    prizePool: 'Certificates provided',
    description: 'Deep-dive into designing distributed microservices, caching architectures, and edge deployment pipelines handling millions of RPS.',
    speakers: 'Devika P (AI Researcher, IIT Madras)'
  },
  {
    id: 3,
    day: '21',
    month: 'NOV',
    title: 'SAIT Annual Sports Day',
    time: '8:30 AM – 5:00 PM',
    venue: 'CUSAT University Grounds',
    category: 'Community',
    flagship: false,
    accent: 'orange',
    fee: 'Free Registration',
    prizePool: 'Trophies & Medals',
    description: 'Inter-batch cricket, football, badminton, and track events uniting 1st, 2nd, 3rd, and final year IT students.',
    speakers: 'Coordinated by SAIT Events Team'
  },
  {
    id: 4,
    day: '04',
    month: 'DEC',
    title: 'Build Night 04: Edge AI Systems',
    time: '4:00 PM – 8:00 PM',
    venue: 'IT Department Lab 3',
    category: 'Workshop',
    flagship: false,
    accent: 'pink',
    fee: 'Free (Hands-on hardware provided)',
    prizePool: 'Mini-project showcase',
    description: 'Hands-on session deploying lightweight quantized neural network models onto Raspberry Pi and ESP32 microcontrollers.',
    speakers: 'Led by SAIT Tech Leads'
  },
  {
    id: 5,
    day: '15',
    month: 'JAN',
    title: 'CodeRelay: Rapid Prototyping',
    time: '10:00 AM – 2:00 PM',
    venue: 'Lab 1, Division of IT',
    category: 'Competition',
    flagship: false,
    accent: 'lime',
    fee: 'Team of 2',
    prizePool: '₹10,000',
    description: 'A high-octane pair programming contest where team members switch keyboard controls every 15 minutes to ship complete full-stack apps.',
    speakers: 'SAIT Tech & Evaluation Jury'
  }
];

export const archiveEvents = [
  {
    title: 'CodeSprint 2026',
    year: '2026',
    category: 'Hackathon',
    participants: '240+ participants',
    desc: '48 innovative prototypes shipped in 24 hours across Web3, AI, and Cloud tracks.'
  },
  {
    title: 'Open Source Week CUSAT',
    year: '2025',
    category: 'Workshop',
    participants: '180+ contributors',
    desc: 'Over 120 PRs merged into prominent open-source repositories with senior mentoring.'
  },
  {
    title: 'Freshers Build Night 2025',
    year: '2025',
    category: 'Community',
    participants: '90 freshers',
    desc: 'Welcoming the incoming batch with Git workshops, terminal hacks, and first web deployments.'
  },
  {
    title: 'Design Jam CUSAT',
    year: '2024',
    category: 'Competition',
    participants: '65 designers',
    desc: '12-hour sprint designing accessible UI/UX systems for public sector civic platforms.'
  }
];

// Faculty and Administration Directory
export const faculty = [
  {
    name: 'Dr. Daleesha M. Viswanathan',
    role: 'Professor & Head of Division',
    area: 'Computer Vision, Image Processing & Machine Learning',
    email: 'daleesha@cusat.ac.in',
    office: 'HoD Cabin, IT Department, SOE',
    tag: 'Head of Department'
  },
  {
    name: 'Dr. Shelbi Joseph',
    role: 'Associate Professor & SAIT Staff Coordinator',
    area: 'Information Security, Cryptography & Algorithms',
    email: 'shelbijoseph@cusat.ac.in',
    office: 'Room 204, IT Block',
    tag: 'Staff Coordinator'
  },
  {
    name: 'Er. Binsu C. Kovoor',
    role: 'Associate Professor & Academic Coordinator',
    area: 'Natural Language Processing & Artificial Intelligence',
    email: 'binsuckovoor@cusat.ac.in',
    office: 'Room 206, IT Block',
    tag: 'Faculty Coordinator'
  },
  {
    name: 'Dr. Santosh Kumar M. B.',
    role: 'Professor',
    area: 'Cloud Computing, Distributed Systems & IoT',
    email: 'santosh@cusat.ac.in',
    office: 'Room 202, IT Block',
    tag: 'Professor'
  },
  {
    name: 'Dr. Preetha S.',
    role: 'Associate Professor',
    area: 'Data Mining, Big Data Analytics & Database Systems',
    email: 'preethas@cusat.ac.in',
    office: 'Room 208, IT Block',
    tag: 'Associate Professor'
  },
  {
    name: 'Dr. Anoop V. S.',
    role: 'Assistant Professor',
    area: 'Deep Learning, Bio-Computing & Neural Networks',
    email: 'anoopvs@cusat.ac.in',
    office: 'Room 210, IT Block',
    tag: 'Assistant Professor'
  },
  {
    name: 'Er. Renumol V. G.',
    role: 'Associate Professor',
    area: 'Human Computer Interaction & Software Engineering',
    email: 'renumol@cusat.ac.in',
    office: 'Room 212, IT Block',
    tag: 'Associate Professor'
  },
  {
    name: 'Er. Sariga Raj',
    role: 'Assistant Professor',
    area: 'Wireless Sensor Networks & Mobile Computing',
    email: 'sarigaraj@cusat.ac.in',
    office: 'Room 214, IT Block',
    tag: 'Assistant Professor'
  }
];

// Academic Resources
export const academicResources = [
  {
    id: 'syl-2023',
    title: 'B.Tech IT Syllabus (2023 Scheme)',
    category: 'Curriculum',
    fileSize: '2.4 MB',
    format: 'PDF',
    description: 'Updated scheme covering AI/ML, Cloud Architecture, Full Stack Dev, and Electives from S1 through S8.'
  },
  {
    id: 'syl-2019',
    title: 'B.Tech IT Syllabus (2019 Scheme)',
    category: 'Curriculum',
    fileSize: '3.1 MB',
    format: 'PDF',
    description: 'Complete course outcomes, syllabus, and credit structure for 2019 scheme students.'
  },
  {
    id: 'lab-manuals',
    title: 'Division IT Lab Manuals & Source Code',
    category: 'Laboratory',
    fileSize: 'GitHub Repo',
    format: 'CODE',
    description: 'Official verified lab manuals for OS, Networking, Web Tech, Database Systems, and Compiler Design.'
  },
  {
    id: 'acad-cal',
    title: 'CUSAT Academic Calendar 2026',
    category: 'Regulations',
    fileSize: '1.2 MB',
    format: 'PDF',
    description: 'Official schedule for internal assessments, exam registration windows, semester breaks, and events.'
  },
  {
    id: 'ktu-points',
    title: 'KTU/CUSAT Activity Points Regulations',
    category: 'Guidelines',
    fileSize: '850 KB',
    format: 'PDF',
    description: 'Complete criteria and point allotment breakdown for the mandatory 100 student activity points.'
  },
  {
    id: 'pyq-vault',
    title: 'Previous Years Question Papers (PYQ Vault)',
    category: 'Exams',
    fileSize: 'Archive',
    format: 'DRIVE',
    description: 'Crowdsourced, curated archive of past 5 years university exam papers with answer keys.'
  }
];

// Association & People (Executive Committee + Sub-teams)
export const people = [
  {
    initials: 'AR',
    name: 'Aarav Raj',
    role: 'Chairperson',
    team: 'Executive Committee',
    batch: 'Batch of 2026',
    bio: 'Oversees SAIT strategic direction, department administration liaison, and flagship events.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'aarav.sait@cusat.ac.in'
  },
  {
    initials: 'NM',
    name: 'Nida M',
    role: 'Vice Chairperson',
    team: 'Executive Committee',
    batch: 'Batch of 2027',
    bio: 'Leads student engagement, internal governance, and sub-team coordination.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'nida.sait@cusat.ac.in'
  },
  {
    initials: 'GK',
    name: 'Gautham Krishna',
    role: 'General Secretary',
    team: 'Executive Committee',
    batch: 'Batch of 2026',
    bio: 'Handles formal communications, documentation, university permits, and student records.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'gautham.sait@cusat.ac.in'
  },
  {
    initials: 'DS',
    name: 'Devanand S',
    role: 'Treasurer',
    team: 'Executive Committee',
    batch: 'Batch of 2026',
    bio: 'Manages association finances, sponsorships, event budgets, and fiscal audits.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'devanand.sait@cusat.ac.in'
  },
  {
    initials: 'AK',
    name: 'Akhil Krish',
    role: 'Tech Lead',
    team: 'Tech',
    batch: 'Batch of 2026',
    bio: 'Full-stack builder, open-source enthusiast, leads department website and student portal.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'akhil.sait@cusat.ac.in'
  },
  {
    initials: 'RV',
    name: 'Rithvik V',
    role: 'Systems & Cloud Associate',
    team: 'Tech',
    batch: 'Batch of 2027',
    bio: 'Manages deployment infrastructure, servers, and competitive programming relays.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'rithvik.sait@cusat.ac.in'
  },
  {
    initials: 'SM',
    name: 'Sneha Mohan',
    role: 'Frontend Engineer',
    team: 'Tech',
    batch: 'Batch of 2027',
    bio: 'Passionate about accessible UI/UX design, React ecosystems, and web performance.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'sneha.sait@cusat.ac.in'
  },
  {
    initials: 'FS',
    name: 'Fathima S',
    role: 'Creative Lead',
    team: 'Media',
    batch: 'Batch of 2026',
    bio: 'Drives brand identity, event art direction, motion design, and visual merchandise.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'fathima.sait@cusat.ac.in'
  },
  {
    initials: 'AP',
    name: 'Ashwin Paul',
    role: 'Visual Designer & Video',
    team: 'Media',
    batch: 'Batch of 2027',
    bio: 'Cinematography, after-movies, festival teasers, and social media reels production.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'ashwin.sait@cusat.ac.in'
  },
  {
    initials: 'RJ',
    name: 'Rohan J',
    role: 'Events Lead',
    team: 'Events',
    batch: 'Batch of 2026',
    bio: 'Curates hackathon schedules, venue logistics, guest speakers, and student activities.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'rohan.sait@cusat.ac.in'
  },
  {
    initials: 'JM',
    name: 'Joel Mathew',
    role: 'Logistics Coordinator',
    team: 'Events',
    batch: 'Batch of 2027',
    bio: 'Stage management, hospitality, audio-visual technical setups, and sports day events.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'joel.sait@cusat.ac.in'
  },
  {
    initials: 'MS',
    name: 'Meera S',
    role: 'PR & Outreach Lead',
    team: 'PR',
    batch: 'Batch of 2026',
    bio: 'Connects SAIT with tech communities across India, industry sponsors, and alumni network.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'meera.sait@cusat.ac.in'
  },
  {
    initials: 'SB',
    name: 'Sanjay B',
    role: 'Public Relations Officer',
    team: 'PR',
    batch: 'Batch of 2027',
    bio: 'Spearheads inter-college outreach, press releases, and corporate collaborations.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'sanjay.sait@cusat.ac.in'
  },
  {
    initials: 'IA',
    name: 'Ishan A',
    role: 'Content Lead',
    team: 'Content',
    batch: 'Batch of 2026',
    bio: 'Chief editor of department newsletters, technical blogs, and official communications.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'ishan.sait@cusat.ac.in'
  },
  {
    initials: 'TM',
    name: 'Tara Menon',
    role: 'Technical Writer',
    team: 'Content',
    batch: 'Batch of 2027',
    bio: 'Creates event documentation, student spotlight interviews, and tutorial publications.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'tara.sait@cusat.ac.in'
  }
];

// Placements & Careers Data
export const placementStats = {
  placementRate: '85%',
  highestPackage: '₹ 12.4 LPA',
  averagePackage: '₹ 6.8 LPA',
  recruitersCount: '38+',
  totalOffers: '142+',
  sectors: [
    { label: 'Product & SaaS', percentage: '34%' },
    { label: 'Cloud & FinTech', percentage: '28%' },
    { label: 'IT Consulting & Services', percentage: '22%' },
    { label: 'AI, Analytics & Research', percentage: '16%' }
  ]
};

export const recruiters = [
  { name: 'TCS Digital', category: 'Enterprise Tech', tier: 'Dream' },
  { name: 'Infosys Power Programmer', category: 'Enterprise Tech', tier: 'Dream' },
  { name: 'UST Global', category: 'Digital Solutions', tier: 'Core' },
  { name: 'EY GDS', category: 'Consulting & Tech', tier: 'Core' },
  { name: 'IBM Software', category: 'Cloud & AI', tier: 'Dream' },
  { name: 'Zoho Corporation', category: 'Product SaaS', tier: 'Dream' },
  { name: 'Oracle', category: 'Database & Cloud', tier: 'Super Dream' },
  { name: 'Wipro Turbo', category: 'Enterprise Tech', tier: 'Core' },
  { name: 'Deloitte USI', category: 'Consulting & Tech', tier: 'Dream' },
  { name: 'Accenture Strategy', category: 'Consulting', tier: 'Core' },
  { name: 'Cognizant GenC Elevate', category: 'Software Services', tier: 'Core' },
  { name: 'Federal Bank Tech', category: 'FinTech & Banking', tier: 'Dream' },
  { name: 'Cisco Systems', category: 'Networking & Cloud', tier: 'Super Dream' },
  { name: 'KeyValue Systems', category: 'Product Development', tier: 'Dream' },
  { name: 'Experion Technologies', category: 'Enterprise Engineering', tier: 'Core' }
];

export const careerResources = [
  {
    id: 'res-dsa',
    title: 'Curated 150 DSA Interview Roadmap',
    desc: 'Topic-wise LeetCode problems categorized by patterns (Two Pointers, Sliding Window, Trees, Graphs, DP).',
    badge: 'Guide'
  },
  {
    id: 'res-sys',
    title: 'System Design 101 for Undergrads',
    desc: 'High-level architectures, load balancing, relational vs NoSQL, sharding, and caching strategies.',
    badge: 'Handbook'
  },
  {
    id: 'res-resume',
    title: 'ATS-Friendly Tech Resume Template',
    desc: 'Clean LaTeX and Word resume template proven to pass automated screening with 90+ ATS scores.',
    badge: 'Template'
  },
  {
    id: 'res-archive',
    title: 'Senior Interview Experience Archive',
    desc: 'Actual transcripts and question breakdowns from CUSAT IT seniors placed in top tech firms.',
    badge: 'Archive'
  }
];

// Alumni Community
export const alumni = [
  {
    batch: '24',
    name: 'Maya Nair',
    role: 'Software Engineer',
    company: 'Cisco, Bengaluru',
    domain: 'Software Engineering',
    contribution: 'Former SAIT Tech Lead. Built distributed observability tooling and mentors junior developers on network systems.',
    linkedin: 'https://linkedin.com'
  },
  {
    batch: '23',
    name: 'Adil Rahman',
    role: 'Senior Product Engineer',
    company: 'NeoBank, Kochi',
    domain: 'Software Engineering',
    contribution: 'Steered Ignite Hackathon 2022. Currently architecting resilient payment settlement engines handling $2M daily volume.',
    linkedin: 'https://linkedin.com'
  },
  {
    batch: '22',
    name: 'Devika P',
    role: 'AI Researcher',
    company: 'IIT Madras Research Park',
    domain: 'Research',
    contribution: 'Published 3 IEEE papers during her undergrad in CUSAT IT. Conducts research on edge vision and federated learning.',
    linkedin: 'https://linkedin.com'
  },
  {
    batch: '21',
    name: 'Rahul Menon',
    role: 'Founder & CEO',
    company: 'CloudForge (YC W23)',
    domain: 'Founder',
    contribution: 'Founded CloudForge straight out of college, scaling automated infrastructure provisioning to over 1,200 organizations.',
    linkedin: 'https://linkedin.com'
  },
  {
    batch: '20',
    name: 'Ananya K',
    role: 'Distributed Systems Engineer',
    company: 'Amazon Web Services, Seattle',
    domain: 'Software Engineering',
    contribution: 'Core engineer on DynamoDB replication subsystem. Frequent speaker at international distributed systems summits.',
    linkedin: 'https://linkedin.com'
  },
  {
    batch: '22',
    name: 'Siddharth V',
    role: 'Quantitative Developer',
    company: 'Goldman Sachs, Bengaluru',
    domain: 'FinTech',
    contribution: 'ACM-ICPC Amritapuri regional medalist. Designs low-latency order execution systems using modern C++ and Rust.',
    linkedin: 'https://linkedin.com'
  }
];

// Achievements / Hall of Fame
export const achievements = [
  {
    year: '2026',
    title: 'Smart India Hackathon (SIH) — 1st Prize',
    type: 'Hackathon',
    category: 'Hackathon',
    detail: 'National Champion in the Software Edition tackling automated disaster response logistics. ₹1,00,000 cash prize.',
    badge: 'National 1st Place',
    proof: 'https://sih.gov.in'
  },
  {
    year: '2026',
    title: 'IEEE Xplore Publication: Distributed Consensus',
    type: 'Research',
    category: 'Publication',
    detail: 'Paper titled "Decentralized Byzantine Fault Tolerant Consensus for Edge Clusters" published by final-year students.',
    badge: 'IEEE Published',
    proof: 'https://ieeexplore.ieee.org'
  },
  {
    year: '2025',
    title: 'ETHIndia 2025 — Infrastructure Track Winner',
    type: 'Hackathon',
    category: 'Hackathon',
    detail: 'Top Web3 builder award for decentralized zero-knowledge identity verification for university credentials.',
    badge: 'Track Winner',
    proof: 'https://ethindia.co'
  },
  {
    year: '2025',
    title: 'ACM-ICPC Amritapuri Regionals Finalist',
    type: 'Competition',
    category: 'Competition',
    detail: 'Ranked in the top 20 collegiate teams across South Asia in algorithmic competitive programming.',
    badge: 'Regional Finalist',
    proof: 'https://icpc.global'
  },
  {
    year: '2025',
    title: 'CUSAT University 1st Rank Holder (B.Tech IT)',
    type: 'Academic',
    category: 'Academic',
    detail: 'Department student topped Cochin University with a cumulative CGPA of 9.84 with honors distinction.',
    badge: 'Gold Medalist',
    proof: 'https://cusat.ac.in'
  },
  {
    year: '2024',
    title: 'Kavach National Cybersecurity Finalist',
    type: 'Competition',
    category: 'Competition',
    detail: 'Built an AI-driven intrusion detection system for Ministry of Home Affairs cyber challenge.',
    badge: 'National Finalist',
    proof: 'https://kavach.gov.in'
  }
];

// Notices & Announcements
export const notices = [
  {
    id: '01',
    title: 'Activity Logger verification window closes this Friday at 5:00 PM',
    date: '2 hours ago',
    category: 'Urgent',
    source: 'HOD Office / SAIT Evaluation Wing',
    urgent: true,
    content: 'All S3, S5, and S7 IT students must submit their extracurricular, workshop, and competition certificates for the current odd semester verification window before Friday 5:00 PM.'
  },
  {
    id: '02',
    title: 'Ignite Hackathon 2026: Team registration portal is officially open',
    date: 'Yesterday',
    category: 'Events',
    source: 'SAIT Tech & Events Team',
    urgent: false,
    content: 'Teams of up to 4 members can now register for Ignite Hackathon 2026. Hardware kits and mentorship allocations will be assigned on a first-come, first-served basis.'
  },
  {
    id: '03',
    title: 'TCS Digital & Infosys Power Programmer recruitment drive timeline released',
    date: '2 days ago',
    category: 'Placements',
    source: 'Division Placement Cell',
    urgent: false,
    content: 'Eligible S7 students with CGPA >= 7.5 and no active backlogs are advised to verify their resumes on the placement portal and prepare for mock technical rounds.'
  },
  {
    id: '04',
    title: 'B.Tech IT Odd Semester Examination schedule published',
    date: '4 days ago',
    category: 'Academic',
    source: 'CUSAT Examination Wing',
    urgent: false,
    content: 'The official end-semester examination dates for S3, S5, and S7 have been published. Download the complete timetable from the academic resources section.'
  },
  {
    id: '05',
    title: 'SAIT Executive Committee elections & Junior Volunteer call 2026-27',
    date: '1 week ago',
    category: 'General',
    source: 'SAIT Executive Body',
    urgent: false,
    content: 'Applications are invited from 1st and 2nd-year IT students for volunteer roles across Tech, Media, Content, Events, and PR teams.'
  }
];

// Activity Logger Initial Data
export const initialActivities = [
  {
    id: 101,
    name: 'Ignite Hackathon 2026 Organizer',
    type: 'Event',
    role: 'Lead Organizer',
    date: '2026-09-02',
    status: 'Verified',
    points: 25,
    proofUrl: 'https://github.com/sait-cusat/ignite',
    verifiedBy: 'Staff Coordinator'
  },
  {
    id: 102,
    name: 'IEEE Paper: Distributed Consensus',
    type: 'Publication',
    role: 'Primary Author',
    date: '2026-08-14',
    status: 'Verified',
    points: 30,
    proofUrl: 'https://ieeexplore.ieee.org',
    verifiedBy: 'HoD Division of IT'
  },
  {
    id: 103,
    name: 'Smart India Hackathon 2025',
    type: 'Competition',
    role: 'Team Lead',
    date: '2026-07-20',
    status: 'Verified',
    points: 25,
    proofUrl: 'https://sih.gov.in',
    verifiedBy: 'Staff Coordinator'
  },
  {
    id: 104,
    name: 'Open Source Week CUSAT',
    type: 'Workshop',
    role: 'Core Contributor',
    date: '2026-06-11',
    status: 'Under Review',
    points: 10,
    proofUrl: 'https://github.com/pulls',
    verifiedBy: 'Pending Faculty Review'
  },
  {
    id: 105,
    name: 'SAIT Sports Day 2025',
    type: 'Volunteering',
    role: 'Event Volunteer',
    date: '2026-04-18',
    status: 'Verified',
    points: 10,
    proofUrl: 'https://sait.cusat.ac.in',
    verifiedBy: 'Events Lead'
  }
];

// Department Activity Leaderboard
export const leaderboard = [
  { rank: 1, name: 'Aditya S', batch: 'S7 IT', points: 110, activities: 9, badge: 'Grandmaster' },
  { rank: 2, name: 'Ananya R', batch: 'S5 IT', points: 95, activities: 7, badge: 'Tech Fellow' },
  { rank: 3, name: 'Gautham K', batch: 'S7 IT', points: 90, activities: 8, badge: 'Lead Innovator' },
  { rank: 4, name: 'Sneha M', batch: 'S5 IT', points: 85, activities: 6, badge: 'Core Builder' },
  { rank: 5, name: 'Rithvik V', batch: 'S3 IT', points: 75, activities: 5, badge: 'Rising Star' },
  { rank: 6, name: 'Joel Mathew', batch: 'S5 IT', points: 70, activities: 5, badge: 'Rising Star' }
];
