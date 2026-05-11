import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LighthouseLogo from '@/components/shared/LighthouseLogo'
import ChatBubble from '@/components/shared/ChatBubble'
import TypingIndicator from '@/components/shared/TypingIndicator'
import { useOnboardingChat } from './useOnboardingChat'
import { onboardingSteps } from './onboardingScript'

export default function OnboardingPage() {
  const {
    messages,
    currentStep,
    isTyping,
    selectedChips,
    inputValue,
    isComplete,
    submitText,
    submitChips,
    toggleChip,
    setInputValue,
  } = useOnboardingChat()

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const totalSteps = onboardingSteps.length
  const step = onboardingSteps[currentStep]
  const isChipStep = step?.inputType === 'chips'
  const maxChips = step?.profileKey === 'targetIndustries' ? 3 : 1

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/90 backdrop-blur sticky top-0 z-10">
        <LighthouseLogo size={28} />
        {messages.length > 0 && !isComplete && (
          <span className="text-xs text-muted-foreground">
            Building your profile · Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
          </span>
        )}
      </header>

      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
        style={{ paddingBottom: isChipStep ? '220px' : '100px' }}
      >
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <ChatBubble key={msg.id} role={msg.role} content={msg.content} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <TypingIndicator />
          </motion.div>
        )}
      </div>

      {/* Input area */}
      {!isComplete && !isTyping && step && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          {/* ExplainWhy */}
          {step.explainWhy && (
            <div className="px-4 pt-3 pb-0">
              <p className="text-xs text-muted-foreground italic flex gap-1.5 items-start">
                <span className="mt-0.5 flex-shrink-0 text-primary">ℹ</span>
                {step.explainWhy}
              </p>
            </div>
          )}

          {isChipStep ? (
            <div className="px-4 pt-3 pb-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {step.chips?.map(chip => {
                  const isSelected = selectedChips.includes(chip)
                  const isDisabled = !isSelected && selectedChips.length >= maxChips
                  return (
                    <button
                      key={chip}
                      onClick={() => toggleChip(chip)}
                      disabled={isDisabled}
                      className={[
                        'rounded-full border px-4 py-1.5 text-sm transition-all duration-150 cursor-pointer',
                        isSelected
                          ? 'bg-primary text-white border-primary'
                          : isDisabled
                            ? 'border-border text-muted-foreground opacity-40 cursor-not-allowed'
                            : 'border-border text-foreground hover:border-primary hover:text-primary',
                      ].join(' ')}
                    >
                      {chip}
                    </button>
                  )
                })}
              </div>
              {maxChips > 1 && (
                <p className="text-xs text-muted-foreground mb-2">
                  {selectedChips.length}/{maxChips} selected
                </p>
              )}
              <Button
                onClick={submitChips}
                disabled={selectedChips.length === 0}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="px-4 py-3 flex gap-2">
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitText()}
                placeholder={step.placeholder ?? 'Type your answer…'}
                className="flex-1 bg-white border-border focus-visible:ring-primary"
                autoFocus
              />
              <Button
                onClick={submitText}
                disabled={!inputValue.trim()}
                size="icon"
                className="bg-primary hover:bg-primary/90 text-white flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
