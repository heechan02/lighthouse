import { useState } from 'react'
import { ArrowRight, AlertCircle, Clock, Trophy, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import * as api from '@/lib/api'
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

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface StudentDetailPanelProps {
  student: AdvisorStudent | null
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
    case 'at-risk': return 'bg-red-50 text-red-600 border-red-200'
    case 'ready-for-1:1': return 'bg-[#4A9B8E]/10 text-[#4A9B8E] border-[#4A9B8E]/20'
    case 'final-year': return 'bg-muted text-muted-foreground border-border'
    case 'first-gen': return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'new': return 'bg-blue-50 text-blue-600 border-blue-200'
  }
}

function AlertIcon({ type }: { type: AdvisorStudent['alerts'][0]['type'] }) {
  if (type === 'deadline') return <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
  if (type === 'stalled') return <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
  return <Trophy className="w-4 h-4 text-[#4A9B8E] flex-shrink-0" />
}

function alertBg(type: AdvisorStudent['alerts'][0]['type']): string {
  if (type === 'deadline') return 'bg-red-50 border-red-100'
  if (type === 'stalled') return 'bg-amber-50 border-amber-100'
  return 'bg-[#4A9B8E]/5 border-[#4A9B8E]/20'
}

export default function StudentDetailPanel({ student }: StudentDetailPanelProps) {
  const [checkInSent, setCheckInSent] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleCheckIn() {
    if (!student || sending || checkInSent) return
    setSending(true)
    await api.sendCheckIn(student.id)
    setSending(false)
    setCheckInSent(true)
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-sm max-w-xs">
          Select a student from the list to view their profile and Lighthouse summary.
        </p>
      </div>
    )
  }

  const initials = student.name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()

  return (
    <motion.div
      key={student.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col gap-5 p-6"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground leading-tight">{student.name}</h2>
          <p className="text-sm text-muted-foreground">
            {student.course} · Year {student.year} · Graduating {student.graduationYear}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Target: <span className="text-foreground font-medium">{student.targetRole}</span>
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {student.tags.map(tag => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${tagColor(tag)}`}
              >
                {tagLabel(tag)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Briefing summary */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 flex flex-col gap-2">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Lighthouse summary</p>
        <p className="text-sm text-foreground leading-relaxed">{student.briefingSummary}</p>
      </div>

      {/* Next recommended action */}
      <div className="rounded-2xl border border-border bg-background shadow-sm p-4 flex gap-3 items-start">
        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Recommended next action</p>
          <p className="text-sm text-foreground leading-relaxed">{student.nextRecommendedAction}</p>
        </div>
      </div>

      {/* Roadmap progress */}
      <div className="rounded-2xl border border-border bg-background shadow-sm p-4 flex flex-col gap-3">
        <p className="text-sm font-semibold text-foreground">Roadmap progress</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${student.roadmapProgress}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-foreground flex-shrink-0">{student.roadmapProgress}%</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Last active {relativeTime(student.lastActiveDate)}
        </p>
      </div>

      {/* Alerts */}
      {student.alerts.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-foreground">Alerts</p>
          {student.alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl border p-3 ${alertBg(alert.type)}`}
            >
              <AlertIcon type={alert.type} />
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <p className="text-sm text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{formatDate(alert.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <Button
          onClick={handleCheckIn}
          disabled={sending || checkInSent}
          className={`rounded-xl min-h-[44px] flex-1 ${
            checkInSent
              ? 'bg-[#4A9B8E] hover:bg-[#4A9B8E]/90 text-white'
              : 'bg-primary hover:bg-primary/90 text-white'
          }`}
        >
          {checkInSent ? '✓ Check-in sent' : sending ? 'Sending...' : 'Send check-in invite'}
        </Button>
        <Button
          variant="outline"
          className="rounded-xl min-h-[44px] border-border text-foreground flex-1"
          disabled
          title="Available in the full product"
        >
          View full roadmap
        </Button>
      </div>

      {checkInSent && (
        <p className="text-xs text-muted-foreground text-center -mt-2">
          A personalised check-in has been queued for {student.name.split(' ')[0]}.
        </p>
      )}
    </motion.div>
  )
}
