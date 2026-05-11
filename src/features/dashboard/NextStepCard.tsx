import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lightbulb, CheckCircle2, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import * as api from '@/lib/api'
import type { RoadmapTask } from '@/mocks/roadmap'

interface NextStepCardProps {
  task: RoadmapTask
  onComplete: (taskId: string) => void
}

export default function NextStepCard({ task, onComplete }: NextStepCardProps) {
  const [completing, setCompleting] = useState(false)
  const [completed, setCompleted] = useState(false)

  async function handleComplete() {
    setCompleting(true)
    setCompleted(true) // optimistic
    try {
      await api.updateTaskStatus(task.id, 'complete')
      onComplete(task.id)
    } catch {
      setCompleted(false)
    } finally {
      setCompleting(false)
    }
  }

  const chatUrl = `/app/chat?q=${encodeURIComponent(task.title)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden"
    >
      <div className="flex">
        <div className="w-1 flex-shrink-0 bg-primary rounded-l-2xl" />
        <div className="flex-1 p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Your next step</p>
            <h3 className={`text-lg font-semibold text-foreground leading-snug ${completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            {task.dueDate && (
              <p className="text-sm text-muted-foreground">
                Due {new Date(task.dueDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}
              </p>
            )}
          </div>

          {task.hiddenCurriculumTip && (
            <div className="flex gap-2 text-sm text-muted-foreground italic">
              <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" aria-hidden />
              <span>{task.hiddenCurriculumTip}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleComplete}
              disabled={completing || completed}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl min-h-[44px] px-5 flex items-center gap-2 transition-all"
              aria-label="Mark this task as complete"
            >
              {completing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : completed ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : null}
              {completed ? 'Marked complete' : 'Mark complete'}
            </Button>

            <Button
              asChild
              variant="ghost"
              className="rounded-xl min-h-[44px] px-5 text-foreground hover:bg-muted/60"
            >
              <Link to={chatUrl}>Ask Lighthouse about this</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
