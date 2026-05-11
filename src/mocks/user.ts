export interface UserProfile {
  id: string
  name: string
  university: string
  course: string
  graduationYear: number
  targetRoles: string[]
  targetIndustries: string[]
  skills: string[]
  backgroundNotes: string
  onboardingComplete: boolean
  roadmapProgress: number  // 0–100
  currentPhase: number     // 1, 2, or 3
}

export const mockUser: UserProfile = {
  id: 'u_001',
  name: 'Amara Osei',
  university: 'Loughborough University',
  course: 'Business Administration',
  graduationYear: 2026,
  targetRoles: ['Management Consultant', 'Strategy Analyst'],
  targetIndustries: ['Consulting', 'Financial Services', 'Tech'],
  skills: ['Data analysis', 'Presentation design', 'Python (beginner)', 'Customer service'],
  backgroundNotes: 'First in family at university. Part-time retail job. From Birmingham.',
  onboardingComplete: true,
  roadmapProgress: 38,
  currentPhase: 1,
}
