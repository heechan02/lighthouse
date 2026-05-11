import { mockUser } from '@/mocks/user'
import type { UserProfile } from '@/mocks/user'
import { mockRoadmap } from '@/mocks/roadmap'
import type { Milestone, TaskStatus } from '@/mocks/roadmap'
import { mockOpportunities } from '@/mocks/opportunities'
import type { Opportunity } from '@/mocks/opportunities'
import { mockChatHistory, mockAIResponses } from '@/mocks/messages'
import type { ChatMessage } from '@/mocks/messages'
import { mockAdvisorStudents } from '@/mocks/advisor'
import type { AdvisorStudent } from '@/mocks/advisor'

// In-memory mutable state
let _user = { ...mockUser }
let _roadmap: Milestone[] = mockRoadmap.map(m => ({
  ...m,
  tasks: m.tasks.map(t => ({ ...t })),
}))
let _opportunities: Opportunity[] = mockOpportunities.map(o => ({ ...o }))
let _chatHistory: ChatMessage[] = [...mockChatHistory]

// Utility: random delay between min and max ms
function delay(min = 600, max = 900): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Utility: stream text word-by-word
export function streamText(
  fullText: string,
  onChunk: (partial: string) => void,
  onDone: () => void
): void {
  const words = fullText.split(' ')
  let index = 0
  let accumulated = ''

  const interval = setInterval(() => {
    if (index >= words.length) {
      clearInterval(interval)
      onDone()
      return
    }
    accumulated += (index === 0 ? '' : ' ') + words[index]
    onChunk(accumulated)
    index++
  }, 30)
}

export async function getProfile(): Promise<UserProfile> {
  await delay()
  return { ..._user }
}

export async function getRoadmap(): Promise<Milestone[]> {
  await delay()
  return _roadmap.map(m => ({ ...m, tasks: m.tasks.map(t => ({ ...t })) }))
}

export async function updateTaskStatus(taskId: string, status: TaskStatus): Promise<void> {
  await delay(300, 500)
  _roadmap = _roadmap.map(m => ({
    ...m,
    tasks: m.tasks.map(t => (t.id === taskId ? { ...t, status } : t)),
  }))
}

export async function getOpportunities(): Promise<Opportunity[]> {
  await delay()
  return _opportunities.map(o => ({ ...o }))
}

export async function getOpportunityById(id: string): Promise<Opportunity | null> {
  await delay()
  return _opportunities.find(o => o.id === id) ?? null
}

export async function saveOpportunity(id: string, saved: boolean): Promise<void> {
  await delay(300, 500)
  _opportunities = _opportunities.map(o => (o.id === id ? { ...o, saved } : o))
}

export async function markApplied(id: string): Promise<void> {
  await delay(300, 500)
  _opportunities = _opportunities.map(o =>
    o.id === id ? { ...o, appliedAt: new Date().toISOString() } : o
  )
}

export async function sendOnboardingMessage(
  message: string,
  step: number
): Promise<{ reply: string; profileComplete: boolean }> {
  await delay(800, 1200)
  const isLastStep = step >= 6
  return {
    reply: isLastStep
      ? "Your roadmap is ready. Let's take a look."
      : `Got it. Let me note that down.`,
    profileComplete: isLastStep,
  }
}

function matchResponse(message: string): { reply: string; followUps: string[] } {
  const lower = message.toLowerCase()
  for (const key of Object.keys(mockAIResponses)) {
    if (key !== 'default' && lower.includes(key)) {
      return mockAIResponses[key]
    }
  }
  return mockAIResponses['default']
}

export async function sendChatMessage(
  message: string
): Promise<{ reply: string; followUps: string[] }> {
  await delay()
  const response = matchResponse(message)

  // Append to in-memory chat history
  const userMsg: ChatMessage = {
    id: `msg_${Date.now()}_u`,
    role: 'user',
    content: message,
    timestamp: new Date().toISOString(),
  }
  const assistantMsg: ChatMessage = {
    id: `msg_${Date.now()}_a`,
    role: 'assistant',
    content: response.reply,
    timestamp: new Date().toISOString(),
  }
  _chatHistory = [..._chatHistory, userMsg, assistantMsg]

  return response
}

export async function getChatHistory(): Promise<ChatMessage[]> {
  await delay()
  return [..._chatHistory]
}

export async function getAdvisorStudents(): Promise<AdvisorStudent[]> {
  await delay()
  return mockAdvisorStudents.map(s => ({ ...s }))
}

export async function sendCheckIn(studentId: string): Promise<void> {
  await delay(400, 600)
  // In a real app this would send an email/notification
  console.log(`Check-in sent to student ${studentId}`)
}
