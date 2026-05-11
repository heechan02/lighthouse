export type OpportunityType =
  | 'spring_week'
  | 'internship'
  | 'graduate'
  | 'insight_day'
  | 'fellowship'

export interface Opportunity {
  id: string
  company: string
  role: string
  type: OpportunityType
  location: string
  remote: boolean
  deadline: string          // ISO date string
  deadlineUrgent: boolean   // true if <7 days away
  fitScore: number          // 0–100
  fitReasons: string[]      // 2–4 items, specific to Amara's profile
  gapAreas: string[]        // 0–2 items — honest but encouraging
  diversityFocused: boolean
  diversityNote?: string
  description: string
  applicationTips: string[]
  applicationUrl: string
  saved: boolean
  appliedAt?: string
}

// Using a date close to the spec's "this Friday" concept
const thisWeekFriday = new Date()
thisWeekFriday.setDate(thisWeekFriday.getDate() + (5 - thisWeekFriday.getDay() + 7) % 7 || 7)
const urgentDeadline = thisWeekFriday.toISOString().split('T')[0]

export const mockOpportunities: Opportunity[] = [
  {
    id: 'op_001',
    company: '10000 Black Interns',
    role: 'Business & Consulting Intern',
    type: 'internship',
    location: 'London',
    remote: false,
    deadline: '2025-03-31',
    deadlineUrgent: false,
    fitScore: 92,
    fitReasons: [
      'Your target role in management consulting aligns directly with the programme\'s business track',
      'As a first-gen student from Birmingham, you fit the programme\'s mission exactly',
      'Your Business Administration degree is strongly preferred by participating firms',
      'Your customer service and data analysis background shows transferable commercial skills',
    ],
    gapAreas: [
      'Python skills listed as beginner — consider completing one online module before applying',
    ],
    diversityFocused: true,
    diversityNote: 'Designed for students of Black heritage across the UK',
    description:
      'The 10000 Black Interns programme places Black students into paid internships at top firms across the UK. Participating firms include leading consulting, finance, law, and tech companies. The programme includes structured mentorship and a community of peers.',
    applicationTips: [
      'The application asks why you\'re passionate about the industry — be specific about consulting, not just "business".',
      'Participating firms include McKinsey, Bain, and Oliver Wyman. You can list preferences but placements are not guaranteed.',
      'The programme runs for 6–8 weeks. Most firms continue successful interns onto their graduate pipeline.',
    ],
    applicationUrl: 'https://www.10000blackinterns.com',
    saved: true,
  },
  {
    id: 'op_002',
    company: 'Bright Network',
    role: 'Consulting Insight Day',
    type: 'insight_day',
    location: 'London',
    remote: true,
    deadline: urgentDeadline,
    deadlineUrgent: true,
    fitScore: 78,
    fitReasons: [
      'Free, open to all UK students — no application barriers',
      'Consulting-specific content tailored to Year 1 and 2 students',
      'Virtual format means no travel costs',
    ],
    gapAreas: [],
    diversityFocused: false,
    description:
      'Bright Network\'s consulting insight day connects students with partners, managers, and analysts from top consulting firms. Sessions include career Q&As, a live case study walkthrough, and networking time. No prior experience needed.',
    applicationTips: [
      'Register early — spaces fill quickly and there\'s no formal selection process, just first-come first-served.',
      'Treat this like an informal interview. Firms notice engaged, curious students.',
      'Prepare one or two questions about the day-to-day of a first-year consultant — it shows genuine interest.',
    ],
    applicationUrl: 'https://www.brightnetwork.co.uk',
    saved: false,
  },
  {
    id: 'op_003',
    company: 'McKinsey & Company',
    role: 'Sophomore Summer Analyst',
    type: 'spring_week',
    location: 'London',
    remote: false,
    deadline: '2025-10-15',
    deadlineUrgent: false,
    fitScore: 85,
    fitReasons: [
      'Your target role as a Management Consultant maps directly onto this programme',
      'McKinsey specifically recruits second-year students from Russell Group and target universities',
      'Your data analysis skill is directly relevant to analyst work at McKinsey',
      'Your presentation design experience is valued in client-facing roles',
    ],
    gapAreas: [
      'Numerical reasoning practice recommended — McKinsey uses the Problem Solving Game (Imbellus)',
    ],
    diversityFocused: false,
    description:
      'McKinsey\'s Sophomore Summer Analyst programme is an 8-week paid internship for second-year students. You\'ll work on real client engagements alongside consultants and managers. Top-performing interns receive full-time analyst offers.',
    applicationTips: [
      'McKinsey no longer uses traditional case interviews — they use a problem-solving game (Imbellus). Practice logical reasoning, not just business cases.',
      'The written application asks about your "greatest achievement." Pick something with measurable impact, not just effort.',
      'Applications open September 1st and often close before the official deadline. Submit in the first two weeks.',
    ],
    applicationUrl: 'https://www.mckinsey.com/careers/students',
    saved: false,
  },
  {
    id: 'op_004',
    company: 'Deloitte',
    role: 'BrightStart Higher Apprenticeship — Consulting',
    type: 'graduate',
    location: 'Multiple UK cities',
    remote: false,
    deadline: '2026-01-31',
    deadlineUrgent: false,
    fitScore: 81,
    fitReasons: [
      'BrightStart is specifically designed for first-gen and non-traditional students',
      'Consulting track aligns with your career goals',
      'Loughborough graduates are well-represented in Deloitte\'s cohorts',
      'Your retail work experience demonstrates commercial awareness Deloitte values',
    ],
    gapAreas: [
      'BrightStart is a degree apprenticeship — confirm you haven\'t already completed a degree-level qualification',
    ],
    diversityFocused: true,
    diversityNote: 'Designed to open consulting careers to students from all backgrounds, including first-gen',
    description:
      'Deloitte BrightStart is one of the UK\'s leading higher apprenticeship programmes in consulting. You\'ll earn while you learn, studying for a degree-level qualification while working on real client projects. It\'s designed for students who want a consulting career without the traditional graduate route.',
    applicationTips: [
      'Deloitte explicitly values social mobility — your first-gen background is a strength, not a gap. Mention it.',
      'The application includes a video interview. Practice answering "Why Deloitte?" and "Why consulting?" in under 90 seconds.',
      'BrightStart applications open in autumn. Deloitte operates on a rolling basis — the earlier you apply, the better.',
    ],
    applicationUrl: 'https://www.deloitte.com/uk/en/careers/bright-start',
    saved: false,
  },
  {
    id: 'op_005',
    company: 'Social Mobility Foundation',
    role: 'Aspire Programme — Professional Mentoring & Internship',
    type: 'fellowship',
    location: 'UK-wide',
    remote: true,
    deadline: '2025-12-01',
    deadlineUrgent: false,
    fitScore: 95,
    fitReasons: [
      'Designed specifically for first-generation university students',
      'Includes mentoring from a senior professional in your target industry',
      'Internship placement with a leading employer included',
      'Programme actively supports students from underrepresented backgrounds in Birmingham and the Midlands',
    ],
    gapAreas: [],
    diversityFocused: true,
    diversityNote: 'Exclusively for first-generation university students from lower socioeconomic backgrounds',
    description:
      'The Social Mobility Foundation\'s Aspire Programme pairs first-gen university students with senior mentors in their target industry and secures them a paid internship with a top employer. The programme runs for 12 months and includes skills workshops, networking events, and career coaching.',
    applicationTips: [
      'The application asks about your background and barriers — be honest and specific. The SMF exists for students in your exact situation.',
      'Your mentor is matched based on your target industry. Ask explicitly for a consulting or strategy professional.',
      'SMF alumni at consulting firms include people at McKinsey, Bain, BCG, and Deloitte. The network is genuinely useful.',
    ],
    applicationUrl: 'https://www.socialmobility.org.uk/aspire',
    saved: true,
  },
]
