import { useState, useCallback, useRef } from 'react'
import type { ChatMessage } from '@/mocks/messages'
import { mockUser } from '@/mocks/user'

const AZURE_ENDPOINT = '/azure'
const AZURE_API_KEY = import.meta.env.VITE_AZURE_API_KEY as string
const AZURE_API_VERSION = '2024-12-01-preview'
const MODEL_NAME = 'gpt-5.4'

const SYSTEM_PROMPT =
  `You are Lighthouse, a helpful careers assistant for university students from underrepresented backgrounds. ` +
  `Your job is to provide personalised careers guidance — covering applications, spring weeks, internships, networking, CVs, and interviews. ` +
  `Be warm, honest, and specific. Never give generic advice. Use the hidden curriculum (things students are rarely told) wherever relevant. ` +
  `Do not answer questions unrelated to careers or university life. ` +
  `The student's full name is "${mockUser.name}" — always use their full first name (never shorten or truncate it). ` +
  `Here is the student profile you are helping:\n\n` +
  JSON.stringify(mockUser, null, 2)

interface StreamMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface AzureMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface UseChatStreamReturn {
  messages: StreamMessage[]
  isStreaming: boolean
  followUps: string[]
  sendMessage: (text: string) => void
  clearHistory: () => void
}

export function useChatStream(initialHistory: ChatMessage[] = []): UseChatStreamReturn {
  const [messages, setMessages] = useState<StreamMessage[]>(
    initialHistory.map(m => ({ id: m.id, role: m.role, content: m.content }))
  )
  const [isStreaming, setIsStreaming] = useState(false)
  const [followUps, setFollowUps] = useState<string[]>([])
  const messagesRef = useRef<StreamMessage[]>(messages)
  messagesRef.current = messages

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return

    const userMsg: StreamMessage = {
      id: `msg_${Date.now()}_u`,
      role: 'user',
      content: text.trim(),
    }

    const assistantMsgId = `msg_${Date.now()}_a`
    const assistantMsg: StreamMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
    }

    const updatedMessages = [...messagesRef.current, userMsg, assistantMsg]
    setMessages(updatedMessages)
    setIsStreaming(true)
    setFollowUps([])

    // Build conversation history for Azure OpenAI
    const azureMessages: AzureMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messagesRef.current.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user', content: text.trim() },
    ]

    try {
      const url = `${AZURE_ENDPOINT}/openai/deployments/${MODEL_NAME}/chat/completions?api-version=${AZURE_API_VERSION}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_API_KEY,
        },
        body: JSON.stringify({
          messages: azureMessages,
          max_completion_tokens: 16384,
          stream: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Azure OpenAI error: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error('No response body')

      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          const data = line.slice(6)
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) {
              accumulated += delta
              setMessages(prev =>
                prev.map(m => m.id === assistantMsgId ? { ...m, content: accumulated } : m)
              )
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      console.error('Azure OpenAI error:', err)
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantMsgId
            ? { ...m, content: "Sorry, I couldn't connect right now. Please try again in a moment." }
            : m
        )
      )
    } finally {
      setIsStreaming(false)
      // Generic follow-ups since we're not using mock responses
      setFollowUps([
        'Tell me more about that',
        'What should I do next?',
        'How do I get started?',
      ])
    }
  }, [isStreaming])

  const clearHistory = useCallback(() => {
    setMessages([])
    setFollowUps([])
  }, [])

  return { messages, isStreaming, followUps, sendMessage, clearHistory }
}
