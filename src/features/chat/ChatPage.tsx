import { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChatBubble from '@/components/shared/ChatBubble'
import TypingIndicator from '@/components/shared/TypingIndicator'
import SuggestedPrompts from './SuggestedPrompts'
import { useChatStream } from './useChatStream'
import * as api from '@/lib/api'
import type { ChatMessage } from '@/mocks/messages'

const DEFAULT_PROMPTS = [
  "What's a spring week?",
  'How do I cold email an alum?',
  'What should I wear to an insight day?',
  'How do I follow up after applying?',
  "What does 'commercial awareness' actually mean?",
  'Is it worth doing a masters?',
]

export default function ChatPage() {
  const [searchParams] = useSearchParams()
  const [initialHistory, setInitialHistory] = useState<ChatMessage[]>([])
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const autoSubmittedRef = useRef(false)

  useEffect(() => {
    api.getChatHistory().then((history) => {
      setInitialHistory(history)
      setHistoryLoaded(true)
    })
  }, [])

  const { messages, isStreaming, followUps, sendMessage } = useChatStream(
    historyLoaded ? initialHistory : []
  )

  // Auto-submit ?q= param once history is loaded
  useEffect(() => {
    if (!historyLoaded || autoSubmittedRef.current) return
    const q = searchParams.get('q')
    if (q) {
      autoSubmittedRef.current = true
      setTimeout(() => sendMessage(q), 100)
    }
  }, [historyLoaded, searchParams, sendMessage])

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  function handleSend() {
    if (!inputValue.trim()) return
    sendMessage(inputValue)
    setInputValue('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handlePromptSelect(prompt: string) {
    sendMessage(prompt)
  }

  const isEmpty = messages.length === 0

  return (
    <motion.div
      className="flex flex-col h-[calc(100vh-3.5rem-4rem)] md:h-[calc(100vh-3.5rem)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="px-4 pt-5 pb-3 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground">Ask Lighthouse anything</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Career guidance, applications, the hidden curriculum — ask away.
        </p>
        <div className="mt-3">
          <SuggestedPrompts
            prompts={isEmpty ? DEFAULT_PROMPTS : followUps.length > 0 ? followUps : DEFAULT_PROMPTS}
            onSelect={handlePromptSelect}
          />
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4">
        <div className="py-4 space-y-4">
          {isEmpty && !isStreaming && (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">L</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Ask me anything about careers, applications, or what to do next. Nothing is too basic.
              </p>
            </div>
          )}

          {messages.map((msg, i) => {
            const isLastAssistant =
              msg.role === 'assistant' && i === messages.length - 1
            return (
              <ChatBubble
                key={msg.id}
                role={msg.role}
                content={msg.content}
                isStreaming={isLastAssistant && isStreaming}
              />
            )
          })}

          {isStreaming && messages[messages.length - 1]?.content === '' && (
            <TypingIndicator />
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-border bg-background">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-white px-4 py-2.5 focus-within:border-primary transition-colors">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything…"
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none leading-relaxed max-h-32"
            style={{ minHeight: '1.5rem' }}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!inputValue.trim() || isStreaming}
            className="h-8 w-8 rounded-xl bg-primary hover:bg-primary/90 flex-shrink-0 disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5 text-white" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </motion.div>
  )
}
