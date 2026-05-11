import { ExternalLink, MessageCircle, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import type { RoadmapTask, TaskStatus } from '@/mocks/roadmap'
import * as api from '@/lib/api'

interface RoadmapDetailSheetProps {
  task: RoadmapTask | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: (taskId: string, status: TaskStatus) => void
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  complete: 'Complete',
}

const STATUS_COLORS: Record<TaskStatus, string> = {
  not_started: 'text-muted-foreground',
  in_progress: 'text-primary',
  complete: 'text-[#4A9B8E]',
}

export default function RoadmapDetailSheet({
  task,
  open,
  onOpenChange,
  onStatusChange,
}: RoadmapDetailSheetProps) {
  if (!task) return null

  const handleStatusChange = (status: TaskStatus) => {
    onStatusChange(task.id, status)
    api.updateTaskStatus(task.id, status)
  }

  const chatUrl = `/app/chat?q=${encodeURIComponent(task.title)}`

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[480px] bg-background flex flex-col gap-0 p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="text-xl font-semibold text-foreground leading-snug pr-6">
            {task.title}
          </SheetTitle>

          {/* Status dropdown */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">Status:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity ${STATUS_COLORS[task.status]}`}>
                  {STATUS_LABELS[task.status]} ▾
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-background border border-border">
                {(Object.keys(STATUS_LABELS) as TaskStatus[]).map(s => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    className={`cursor-pointer ${STATUS_COLORS[s]}`}
                  >
                    {STATUS_LABELS[s]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Due date */}
          {task.dueDate && (
            <p className="text-sm text-muted-foreground mt-1">
              Due {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Description */}
          <p className="text-sm text-foreground leading-relaxed">{task.description}</p>

          {/* Hidden curriculum tip */}
          {task.hiddenCurriculumTip && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
              <Lightbulb size={16} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">What they don't tell you</p>
                <p className="text-sm text-foreground leading-relaxed">{task.hiddenCurriculumTip}</p>
              </div>
            </div>
          )}

          {/* Resource link */}
          {task.resourceUrl && (
            <div className="border border-border rounded-2xl p-4 flex items-center gap-3">
              <ExternalLink size={15} className="text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Useful resource</p>
                <a
                  href={task.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline cursor-pointer"
                >
                  {task.resourceUrl.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          )}

          {/* Ask Lighthouse CTA */}
          <Link
            to={chatUrl}
            className="flex items-center gap-2 text-sm text-primary hover:underline cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            <MessageCircle size={15} />
            Ask Lighthouse about this
          </Link>
        </div>

        {/* Footer action */}
        <div className="px-6 py-4 border-t border-border">
          <Button
            onClick={() => {
              handleStatusChange('complete')
              onOpenChange(false)
            }}
            disabled={task.status === 'complete'}
            className="w-full bg-primary text-white hover:bg-primary/90 rounded-2xl cursor-pointer disabled:opacity-50"
          >
            {task.status === 'complete' ? 'Already complete' : 'Mark as complete'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
