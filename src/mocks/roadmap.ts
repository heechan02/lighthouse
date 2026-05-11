export type TaskStatus = 'complete' | 'in_progress' | 'not_started'

export interface RoadmapTask {
  id: string
  title: string
  description: string
  status: TaskStatus
  dueDate?: string
  hiddenCurriculumTip?: string
  resourceUrl?: string
}

export interface Milestone {
  id: string
  phase: number
  title: string
  dateRange: string
  tasks: RoadmapTask[]
}

export const mockRoadmap: Milestone[] = [
  {
    id: 'm_001',
    phase: 1,
    title: 'Foundation',
    dateRange: 'Year 1 — Year 2 Spring',
    tasks: [
      {
        id: 't_001',
        title: 'Complete LinkedIn profile to All-Star',
        description:
          'Fill in every section: headline, about, experience, education, skills, and a profile photo. LinkedIn All-Star status means your profile appears in more search results.',
        status: 'complete',
        hiddenCurriculumTip:
          'Firms look at your LinkedIn before interviews. Make yours look complete.',
      },
      {
        id: 't_002',
        title: 'Join at least two relevant university societies',
        description:
          'Look for business, consulting, finance, or career-focused societies at Loughborough. These give you leadership opportunities, events, and connections.',
        status: 'complete',
      },
      {
        id: 't_003',
        title: 'Research what a "spring week" is and which firms offer them',
        description:
          'Spring weeks are 1-week taster programmes offered by top firms to first and second year students. Research which consulting and finance firms run them.',
        status: 'complete',
        hiddenCurriculumTip:
          'Spring weeks close in October — most students don\'t realise until it\'s too late.',
      },
      {
        id: 't_004',
        title: 'Cold email one alumni at a target firm',
        description:
          'Find a Loughborough alumni working at a firm you\'re interested in via LinkedIn. Send a short, warm email asking for 15 minutes to learn about their experience.',
        status: 'in_progress',
        hiddenCurriculumTip:
          'Cold emails to alumni work best on Tuesday mornings. Keep it to 5 sentences.',
      },
      {
        id: 't_005',
        title: 'Attend a careers fair and speak to 3 firms',
        description:
          'Go prepared with a 30-second introduction and 2–3 thoughtful questions for each firm. Collect business cards and follow up by email within 24 hours.',
        status: 'not_started',
        dueDate: '2025-11-15',
      },
    ],
  },
  {
    id: 'm_002',
    phase: 2,
    title: 'Application Blitz',
    dateRange: 'Year 2 Spring — Year 2 Summer',
    tasks: [
      {
        id: 't_006',
        title: 'Apply to 2 spring week programmes',
        description:
          'Identify two spring week programmes that match your interests. Complete all application stages including online tests and written questions.',
        status: 'not_started',
        dueDate: '2025-10-31',
        hiddenCurriculumTip:
          'Spring weeks close in October — most students don\'t realise until it\'s too late.',
      },
      {
        id: 't_007',
        title: 'Prepare a one-page CV in consulting format',
        description:
          'Consulting CVs are one page, reverse-chronological, and heavy on measurable impact. Every bullet should start with a strong action verb and end with a result.',
        status: 'not_started',
      },
      {
        id: 't_008',
        title: 'Complete a numerical reasoning practice test',
        description:
          'Most consulting and finance firms use numerical reasoning tests in their application process. Practice on SHL or Kenexa-style tests to get comfortable with the format.',
        status: 'not_started',
        resourceUrl: 'https://www.practiceaptitudetests.com',
      },
      {
        id: 't_009',
        title: 'Attend a firm insight day or open day',
        description:
          'Many firms run free insight days for underrepresented students. These are not just for learning — they often lead directly to fast-track application routes.',
        status: 'not_started',
      },
    ],
  },
  {
    id: 'm_003',
    phase: 3,
    title: 'Interview & Offer',
    dateRange: 'Year 3 — Graduation',
    tasks: [
      {
        id: 't_010',
        title: 'Complete 5 case interview practice sessions',
        description:
          'Case interviews are unique to consulting and require specific practice. Find a practice partner, use case books (Victor Cheng, Case in Point), and record yourself.',
        status: 'not_started',
        hiddenCurriculumTip:
          'Case interview prep takes 50–100 hours. Start 3 months before applications.',
      },
      {
        id: 't_011',
        title: 'Apply to graduate scheme (consulting track)',
        description:
          'Research and apply to graduate consulting schemes at your target firms. Applications typically open in September and close by November for major firms.',
        status: 'not_started',
        dueDate: '2025-11-01',
      },
      {
        id: 't_012',
        title: 'Prepare your "Why consulting?" story',
        description:
          'Every consulting interview starts with "Why consulting?" Your answer should be specific, genuine, and tied to real experiences. Prepare a 90-second version and a 3-minute version.',
        status: 'not_started',
      },
      {
        id: 't_013',
        title: 'Negotiate your offer package',
        description:
          'If you receive an offer, review it carefully. Starting salary, signing bonus, and location are often negotiable — especially if you have competing offers.',
        status: 'not_started',
        hiddenCurriculumTip:
          'You don\'t need to accept the first offer. Even at consulting firms, packages are negotiable.',
      },
    ],
  },
]
