import { motion } from 'framer-motion'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-inside mt-1 space-y-0.5">$1</ul>')
    .replace(/\n/g, '<br />')
}

export default function ChatBubble({ role, content, isStreaming = false }: ChatBubbleProps) {
  if (role === 'user') {
    return (
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="max-w-[80%] bg-primary text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed">
          {content}
          {isStreaming && <span className="animate-pulse ml-0.5">|</span>}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="flex items-start gap-2.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-white text-xs font-semibold">L</span>
      </div>
      <div className="max-w-[80%] bg-white shadow-sm px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm leading-relaxed text-foreground">
        <span
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
        {isStreaming && <span className="animate-pulse ml-0.5">|</span>}
      </div>
    </motion.div>
  )
}
