import { Info } from 'lucide-react'
import type { RoadmapTask } from '@/mocks/roadmap'
import * as api from '@/lib/api'

interface TaskItemProps {
  task: RoadmapTask
  onStatusChange: (taskId: string, checked: boolean) => void
  onOpenDetail: (task: RoadmapTask) => void
}

export default function TaskItem({ task, onStatusChange, onOpenDetail }: TaskItemProps) {
  const isComplete = task.status === 'complete'
  const isInProgress = task.status === 'in_progress'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStatusChange(task.id, e.target.checked)
    api.updateTaskStatus(task.id, e.target.checked ? 'complete' : 'not_started')
  }

  return (
    <div className="flex items-start gap-3 py-3 px-1 group">
      {/* Custom checkbox */}
      <label className="flex items-center cursor-pointer mt-0.5 shrink-0">
        <input
          type="checkbox"
          checked={isComplete}
          onChange={handleChange}
          className="peer sr-only"
        />
        <span className="w-5 h-5 rounded border-2 border-border flex items-center justify-center transition-colors duration-150 peer-checked:bg-[#4A9B8E] peer-checked:border-[#4A9B8E] peer-focus:ring-2 peer-focus:ring-primary/30 cursor-pointer">
          {isComplete && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </label>

      {/* Task title */}
      <div className="flex-1 min-w-0">
        <span className={`text-sm leading-snug ${isComplete ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
          {task.title}
        </span>
        {task.dueDate && !isComplete && (
          <p className="text-xs text-muted-foreground mt-0.5">
            Due {new Date(task.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </p>
        )}
      </div>

      {/* Status dot */}
      {isInProgress && !isComplete && (
        <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" title="In progress" />
      )}

      {/* Hidden curriculum tip indicator */}
      {task.hiddenCurriculumTip && !isComplete && (
        <span className="mt-1 w-2 h-2 rounded-full bg-primary/60 shrink-0" title="Tip available" />
      )}

      {/* Info button */}
      <button
        onClick={() => onOpenDetail(task)}
        className="shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 cursor-pointer"
        aria-label={`Details for ${task.title}`}
      >
        <Info size={15} />
      </button>
    </div>
  )
}
