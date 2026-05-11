import type { UserProfile } from '@/mocks/user'

export interface OnboardingStep {
  id: string
  message: string
  inputType: 'text' | 'chips' | 'none'
  chips?: string[]
  placeholder?: string
  profileKey?: keyof UserProfile
  explainWhy?: string
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'ob_01',
    message: "Hi, I'm Lighthouse. Before we build your roadmap, I'd like to get to know you a bit. What's your name?",
    inputType: 'text',
    placeholder: 'Your first name is fine',
    profileKey: 'name',
  },
  {
    id: 'ob_02',
    message: "Nice to meet you, {name}. Which university do you go to, and what are you studying?",
    inputType: 'text',
    placeholder: 'e.g. Loughborough University, Business Administration',
    profileKey: 'university',
  },
  {
    id: 'ob_03',
    message: "What kind of role are you hoping to land after you graduate? Don't worry if you're not sure — just give me your best guess.",
    inputType: 'text',
    placeholder: 'e.g. Management Consultant, Product Manager, Solicitor',
    profileKey: 'targetRoles',
  },
  {
    id: 'ob_04',
    message: 'Which industries interest you most? Pick up to three.',
    inputType: 'chips',
    chips: ['Consulting', 'Finance', 'Technology', 'Healthcare', 'Law', 'Marketing', 'Government', 'Not sure yet'],
    profileKey: 'targetIndustries',
    explainWhy: 'This helps me surface opportunities and insight days that match where you want to go.',
  },
  {
    id: 'ob_05',
    message: "What skills or experiences do you already have — from uni, work, or anything else? Nothing is too small.",
    inputType: 'text',
    placeholder: 'e.g. customer service, data analysis, society committee role, retail',
    profileKey: 'skills',
  },
  {
    id: 'ob_06',
    message: 'Almost done. When do you graduate?',
    inputType: 'chips',
    chips: ['2025', '2026', '2027', '2028'],
    profileKey: 'graduationYear',
  },
  {
    id: 'ob_07',
    message: "One last thing — are you the first in your family to go to university? You can skip this if you'd prefer.",
    inputType: 'chips',
    chips: ['Yes', 'No', 'Rather not say'],
    profileKey: 'backgroundNotes',
    explainWhy: "Being first-gen can shape what kinds of support and opportunities are most relevant to you. This never affects what you can access — it just helps me personalise things.",
  },
]
