import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import TaskItem from './TaskItem'
import type { Milestone, RoadmapTask, TaskStatus } from '@/mocks/roadmap'

interface MilestoneAccordionProps {
  milestone: Milestone
  defaultOpen?: boolean
  onTaskStatusChange: (taskId: string, status: TaskStatus) => void
  onOpenDetail: (task: RoadmapTask) => void
}

export default function MilestoneAccordion({
  milestone,
  defaultOpen = false,
  onTaskStatusChange,
  onOpenDetail,
}: MilestoneAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  const total = milestone.tasks.length
  const done = milestone.tasks.filter(t => t.status === 'complete').length
  const allDone = done === total
  const noneStarted = milestone.tasks.every(t => t.status === 'not_started')

  const statusChip = allDone
    ? { label: 'Complete', cls: 'bg-[#4A9B8E]/10 text-[#4A9B8E]' }
    : noneStarted
    ? { label: 'Not started', cls: 'bg-muted text-muted-foreground' }
    : { label: 'In progress', cls: 'bg-primary/10 text-primary' }

  const handleCheckbox = (taskId: string, checked: boolean) => {
    onTaskStatusChange(taskId, checked ? 'complete' : 'not_started')
  }

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-background">
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/40 transition-colors duration-150 cursor-pointer"
        aria-expanded={open}
      >
        {/* Phase badge */}
        <span className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
          {milestone.phase}
        </span>

        {/* Title + date range */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm leading-tight">
            Phase {milestone.phase} — {milestone.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{milestone.dateRange}</p>
        </div>

        {/* Right: progress + status + chevron */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {done} / {total} complete
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusChip.cls}`}>
            {statusChip.label}
          </span>
          <ChevronDown
            size={16}
            className={`text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-3 border-t border-border divide-y divide-border">
              {milestone.tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusChange={handleCheckbox}
                  onOpenDetail={onOpenDetail}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
