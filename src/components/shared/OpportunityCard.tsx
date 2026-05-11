import type { Opportunity } from '@/mocks/opportunities'
import { cn } from '@/lib/utils'

interface OpportunityCardProps {
  opportunity: Opportunity
  onClick: () => void
}

function fitScoreColor(score: number) {
  if (score >= 80) return 'bg-primary text-white'
  if (score >= 60) return 'bg-orange-100 text-orange-700'
  return 'bg-muted text-muted-foreground'
}

export default function OpportunityCard({ opportunity, onClick }: OpportunityCardProps) {
  const { company, role, fitScore, deadline, deadlineUrgent, diversityFocused } = opportunity

  const deadlineDate = new Date(deadline)
  const deadlineLabel = deadlineDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

  return (
    <div
      className="w-60 flex-shrink-0 border border-border rounded-2xl p-4 bg-background hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3"
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-foreground text-sm leading-tight">{company}</p>
        <p className="text-muted-foreground text-xs leading-snug">{role}</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full', fitScoreColor(fitScore))}>
          {fitScore}% match
        </span>
        <span className={cn('text-xs px-2.5 py-0.5 rounded-full border', deadlineUrgent ? 'text-red-600 border-red-200 bg-red-50' : 'text-muted-foreground border-border')}>
          {deadlineUrgent ? `⚡ ${deadlineLabel}` : `Closes ${deadlineLabel}`}
        </span>
      </div>

      {diversityFocused && (
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-teal-muted flex-shrink-0" style={{ backgroundColor: '#4A9B8E' }} />
          <span className="text-xs text-muted-foreground">Targeted programme</span>
        </div>
      )}

      <div className="mt-auto pt-1">
        <span className="text-xs text-primary font-medium">View details →</span>
      </div>
    </div>
  )
}
