export type StudentTag = 'first-gen' | 'at-risk' | 'ready-for-1:1' | 'final-year' | 'new'

export interface StudentAlert {
  type: 'deadline' | 'stalled' | 'milestone'
  message: string
  date: string
}

export interface AdvisorStudent {
  id: string
  name: string
  year: number
  course: string
  graduationYear: number
  targetRole: string
  roadmapProgress: number
  lastActiveDate: string
  tags: StudentTag[]
  alerts: StudentAlert[]
  briefingSummary: string
  nextRecommendedAction: string
}

export const mockAdvisorStudents: AdvisorStudent[] = [
  {
    id: 's_001',
    name: 'Amara Osei',
    year: 2,
    course: 'Business Administration',
    graduationYear: 2026,
    targetRole: 'Management Consultant',
    roadmapProgress: 38,
    lastActiveDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    tags: ['first-gen'],
    alerts: [
      {
        type: 'deadline',
        message: 'Bright Network Insight Day closes this Friday',
        date: new Date(Date.now() + 86400000 * 4).toISOString(),
      },
    ],
    briefingSummary:
      "Amara is a second-year Business student targeting management consulting. She's first in her family at university and is making solid progress — 3 of 5 Phase 1 tasks complete. She has a live cold email task in progress and one opportunity deadline approaching this week. Engagement is high: she's been active in the last 24 hours.",
    nextRecommendedAction:
      "Send a quick nudge about the Bright Network deadline this Friday. She may not have seen the alert yet.",
  },
  {
    id: 's_002',
    name: 'Marcus Thompson',
    year: 3,
    course: 'Finance',
    graduationYear: 2025,
    targetRole: 'Investment Analyst',
    roadmapProgress: 72,
    lastActiveDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    tags: ['ready-for-1:1', 'final-year'],
    alerts: [
      {
        type: 'milestone',
        message: 'Completed Phase 2 — Application Blitz. Ready to move to interviews.',
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
    ],
    briefingSummary:
      "Marcus is a final-year Finance student who recently completed Phase 2 of his roadmap. He has two live applications at Goldman Sachs and Barclays and is now focused on interview preparation. He's a mature student transitioning from retail management, and his commercial experience is a genuine differentiator. Ready for a 1:1 to discuss interview strategy.",
    nextRecommendedAction:
      "Schedule a 1:1 to help him prepare for his Goldman Sachs first-round interview. He's ready and engaged.",
  },
  {
    id: 's_003',
    name: 'Priya Sharma',
    year: 2,
    course: 'Computer Science',
    graduationYear: 2026,
    targetRole: 'Product Manager',
    roadmapProgress: 15,
    lastActiveDate: new Date(Date.now() - 86400000 * 12).toISOString(),
    tags: ['at-risk'],
    alerts: [
      {
        type: 'stalled',
        message: 'No activity in 12 days. Last task: research internships.',
        date: new Date(Date.now() - 86400000 * 12).toISOString(),
      },
    ],
    briefingSummary:
      "Priya is a second-year Computer Science student interested in product management. She completed onboarding enthusiastically but hasn't been active for 12 days. Her roadmap progress is low relative to her year group. She may be overwhelmed — her degree is demanding and she mentioned balancing part-time work during onboarding.",
    nextRecommendedAction:
      "Send a personal check-in message. Keep it low-pressure — acknowledge that the term gets busy and offer to simplify her next steps.",
  },
  {
    id: 's_004',
    name: 'James Okonkwo',
    year: 4,
    course: 'Law',
    graduationYear: 2025,
    targetRole: 'Commercial Solicitor',
    roadmapProgress: 91,
    lastActiveDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    tags: ['final-year', 'first-gen'],
    alerts: [
      {
        type: 'milestone',
        message: 'Completed all Phase 3 tasks. Training contract offer received from Freshfields.',
        date: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ],
    briefingSummary:
      "James has just received a training contract offer from Freshfields — a fantastic outcome. He's a final-year Law student and first-gen, and has been one of the most engaged students on the platform. His roadmap is 91% complete. He's now in the offer evaluation and negotiation phase.",
    nextRecommendedAction:
      "Congratulate James and offer a quick conversation about offer negotiation — he may not know this is possible.",
  },
  {
    id: 's_005',
    name: 'Sofia Reyes',
    year: 1,
    course: 'Marketing',
    graduationYear: 2028,
    targetRole: 'Brand Manager',
    roadmapProgress: 8,
    lastActiveDate: new Date(Date.now() - 86400000 * 0).toISOString(),
    tags: ['new', 'first-gen'],
    alerts: [],
    briefingSummary:
      "Sofia just started onboarding today — she's a first-year Marketing student with a clear interest in brand management. She's first-gen and based in Manchester. Too early to flag any concerns; focus is on getting her through the onboarding flow and onto her roadmap. High potential based on her profile.",
    nextRecommendedAction:
      "No action needed yet. Check back in 48 hours to see if she's completed onboarding and started her first roadmap task.",
  },
]
