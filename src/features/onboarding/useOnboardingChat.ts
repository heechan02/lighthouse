import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { onboardingSteps } from './onboardingScript'
import * as api from '@/lib/api'
import type { UserProfile } from '@/mocks/user'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface OnboardingChatState {
  messages: Message[]
  currentStep: number
  isTyping: boolean
  profileData: Partial<UserProfile>
  selectedChips: string[]
  inputValue: string
  isComplete: boolean
}

interface OnboardingChatActions {
  submitText: () => void
  submitChips: () => void
  toggleChip: (chip: string) => void
  setInputValue: (value: string) => void
}

export function useOnboardingChat(): OnboardingChatState & OnboardingChatActions {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [profileData, setProfileData] = useState<Partial<UserProfile>>({})
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  // Show first message after mount delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const step = onboardingSteps[0]
      setMessages([{ id: `ai_0`, role: 'assistant', content: step.message }])
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const advanceToStep = useCallback(
    (nextStep: number, userAnswer: string) => {
      const userMsg: Message = {
        id: `user_${Date.now()}`,
        role: 'user',
        content: userAnswer,
      }
      setMessages(prev => [...prev, userMsg])
      setIsTyping(true)

      const delay = 800 + Math.random() * 400

      setTimeout(async () => {
        if (nextStep >= onboardingSteps.length) {
          // Final completion
          const finalMsg: Message = {
            id: `ai_final`,
            role: 'assistant',
            content: "Your roadmap is ready. Let's take a look.",
          }
          setMessages(prev => [...prev, finalMsg])
          setIsTyping(false)
          setIsComplete(true)
          await api.getProfile() // simulate save
          setTimeout(() => navigate('/app'), 1200)
        } else {
          let nextMessage = onboardingSteps[nextStep].message
          // Replace {name} placeholder
          if (profileData.name) {
            nextMessage = nextMessage.replace('{name}', profileData.name as string)
          }
          const aiMsg: Message = {
            id: `ai_${nextStep}`,
            role: 'assistant',
            content: nextMessage,
          }
          setMessages(prev => [...prev, aiMsg])
          setIsTyping(false)
          setCurrentStep(nextStep)
        }
      }, delay)
    },
    [profileData.name, navigate]
  )

  const collectAnswer = useCallback(
    (answer: string) => {
      const step = onboardingSteps[currentStep]
      const newProfileData = { ...profileData }

      if (step.profileKey) {
        if (step.profileKey === 'targetRoles' || step.profileKey === 'skills') {
          newProfileData[step.profileKey] = answer.split(',').map(s => s.trim()) as never
        } else if (step.profileKey === 'targetIndustries') {
          newProfileData.targetIndustries = selectedChips
        } else if (step.profileKey === 'graduationYear') {
          newProfileData.graduationYear = parseInt(answer) as never
        } else if (step.profileKey === 'backgroundNotes') {
          newProfileData.backgroundNotes = `First-gen: ${answer}`
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(newProfileData as any)[step.profileKey] = answer
        }
      }

      setProfileData(newProfileData)
      return newProfileData
    },
    [currentStep, profileData, selectedChips]
  )

  const submitText = useCallback(() => {
    if (!inputValue.trim() || isTyping) return
    const answer = inputValue.trim()
    setInputValue('')
    collectAnswer(answer)
    advanceToStep(currentStep + 1, answer)
  }, [inputValue, isTyping, collectAnswer, advanceToStep, currentStep])

  const submitChips = useCallback(() => {
    if (selectedChips.length === 0 || isTyping) return
    const answer = selectedChips.join(', ')
    const step = onboardingSteps[currentStep]

    if (step.profileKey === 'targetIndustries') {
      setProfileData(prev => ({ ...prev, targetIndustries: selectedChips }))
    } else if (step.profileKey === 'graduationYear') {
      setProfileData(prev => ({ ...prev, graduationYear: parseInt(selectedChips[0]) as never }))
    } else if (step.profileKey === 'backgroundNotes') {
      setProfileData(prev => ({ ...prev, backgroundNotes: `First-gen: ${selectedChips[0]}` }))
    }

    setSelectedChips([])
    advanceToStep(currentStep + 1, answer)
  }, [selectedChips, isTyping, currentStep, advanceToStep])

  const toggleChip = useCallback(
    (chip: string) => {
      const step = onboardingSteps[currentStep]
      const isMulti = step.profileKey === 'targetIndustries'

      if (isMulti) {
        setSelectedChips(prev =>
          prev.includes(chip)
            ? prev.filter(c => c !== chip)
            : prev.length < 3
              ? [...prev, chip]
              : prev
        )
      } else {
        // Single select chips (graduation year, first-gen)
        setSelectedChips([chip])
      }
    },
    [currentStep]
  )

  return {
    messages,
    currentStep,
    isTyping,
    profileData,
    selectedChips,
    inputValue,
    isComplete,
    submitText,
    submitChips,
    toggleChip,
    setInputValue,
  }
}
