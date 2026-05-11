import { useState } from 'react'
import { CheckCircle, Circle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ChecklistItem {
  id: string
  label: string
}

interface ApplicationChecklistProps {
  opportunityId: string
  tips: string[]
}

// Derive checklist items from opportunity tips + generic steps
function buildChecklist(tips: string[]): ChecklistItem[] {
  const generic: ChecklistItem[] = [
    { id: 'research', label: 'Research the company and role' },
    { id: 'cv', label: 'Tailor your CV to this opportunity' },
    { id: 'coverletter', label: 'Draft your cover letter or written answers' },
  ]
  const tipItems: ChecklistItem[] = tips.slice(0, 2).map((tip, i) => ({
    id: `tip_${i}`,
    label: tip.length > 80 ? tip.slice(0, 80) + '…' : tip,
  }))
  return [...generic, ...tipItems]
}

export default function ApplicationChecklist({
  opportunityId: _opportunityId,
  tips,
}: ApplicationChecklistProps) {
  const items = buildChecklist(tips)
  const [checked, setChecked] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setChecked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const completedCount = checked.size
  const totalCount = items.length
  const progress = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Application checklist
          </span>
          <span className="text-xs text-muted-foreground">
            {completedCount} of {totalCount} complete
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <ul className="space-y-2">
        {items.map(item => {
          const done = checked.has(item.id)
          return (
            <li key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className="flex items-start gap-3 w-full text-left group cursor-pointer"
                aria-pressed={done}
              >
                {done ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 transition-colors" style={{ color: '#4A9B8E' }} />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                )}
                <span
                  className={cn(
                    'text-sm leading-relaxed transition-colors',
                    done ? 'line-through text-muted-foreground' : 'text-foreground'
                  )}
                >
                  {item.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
