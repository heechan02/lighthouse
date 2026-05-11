import { Progress } from '@/components/ui/progress'
import type { AdvisorStudent, StudentTag } from '@/mocks/advisor'

function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return minutes <= 1 ? 'just now' : `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

interface StudentRowProps {
  student: AdvisorStudent
  selected: boolean
  onClick: () => void
}

function tagLabel(tag: StudentTag): string {
  switch (tag) {
    case 'first-gen': return 'First-gen'
    case 'at-risk': return 'At risk'
    case 'ready-for-1:1': return 'Ready for 1:1'
    case 'final-year': return 'Final year'
    case 'new': return 'New'
  }
}

function tagColor(tag: StudentTag): string {
  switch (tag) {
    case 'at-risk': return 'bg-red-50 text-red-600'
    case 'ready-for-1:1': return 'bg-[#4A9B8E]/10 text-[#4A9B8E]'
    case 'final-year': return 'bg-muted text-muted-foreground'
    case 'first-gen': return 'bg-amber-50 text-amber-700'
    case 'new': return 'bg-blue-50 text-blue-600'
  }
}

function alertDot(type: AdvisorStudent['alerts'][0]['type']): string {
  switch (type) {
    case 'deadline': return 'bg-red-500'
    case 'stalled': return 'bg-amber-500'
    case 'milestone': return 'bg-[#4A9B8E]'
  }
}

export default function StudentRow({ student, selected, onClick }: StudentRowProps) {
  const initials = student.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
  const lastActive = relativeTime(student.lastActiveDate)
  const topAlert = student.alerts[0]

  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all hover:bg-amber-50/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        selected
          ? 'bg-amber-50 border-primary border-l-2 shadow-sm'
          : 'border-transparent'
      }`}
      aria-pressed={selected}
    >
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
        <span className="text-white text-sm font-semibold">{initials}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-foreground truncate">{student.name}</span>
          {topAlert && (
            <span className={`flex-shrink-0 w-2 h-2 rounded-full ${alertDot(topAlert.type)}`} aria-label={`${topAlert.type} alert`} />
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          Year {student.year} · {student.course}
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mt-1.5">
          <Progress value={student.roadmapProgress} className="h-1.5 flex-1 rounded-full" />
          <span className="text-xs text-muted-foreground flex-shrink-0">{student.roadmapProgress}%</span>
        </div>

        {/* Tags + last active */}
        <div className="flex items-center justify-between mt-1.5 gap-2">
          <div className="flex gap-1 flex-wrap">
            {student.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor(tag)}`}
              >
                {tagLabel(tag)}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0">{lastActive}</span>
        </div>
      </div>
    </button>
  )
}
