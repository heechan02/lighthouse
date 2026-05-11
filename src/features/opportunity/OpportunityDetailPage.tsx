import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Bookmark,
  BookmarkCheck,
  CheckSquare,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { OpportunitySkeleton } from '@/components/shared/PageLoader'
import FitScoreRing from './FitScoreRing'
import ApplicationChecklist from './ApplicationChecklist'
import * as api from '@/lib/api'
import type { Opportunity } from '@/mocks/opportunities'

const TYPE_LABELS: Record<Opportunity['type'], string> = {
  spring_week: 'Spring Week',
  internship: 'Internship',
  graduate: 'Graduate',
  insight_day: 'Insight Day',
  fellowship: 'Fellowship',
}

function formatDeadline(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function OpportunityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [applied, setApplied] = useState(false)
  const [savingInProgress, setSavingInProgress] = useState(false)
  const [applyingInProgress, setApplyingInProgress] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api.getOpportunityById(id).then(opp => {
      if (!opp) {
        navigate('/app', { replace: true })
        return
      }
      setOpportunity(opp)
      setSaved(opp.saved)
      setApplied(!!opp.appliedAt)
      setLoading(false)
    })
  }, [id, navigate])

  async function handleToggleSave() {
    if (!opportunity || savingInProgress) return
    setSavingInProgress(true)
    const next = !saved
    setSaved(next)
    await api.saveOpportunity(opportunity.id, next)
    setSavingInProgress(false)
  }

  async function handleMarkApplied() {
    if (!opportunity || applyingInProgress || applied) return
    setApplyingInProgress(true)
    setApplied(true)
    await api.markApplied(opportunity.id)
    setApplyingInProgress(false)
  }

  if (loading) {
    return (
      <div className="px-4 pt-6 pb-24 md:pb-8 max-w-3xl mx-auto">
        <OpportunitySkeleton />
      </div>
    )
  }

  if (!opportunity) return null

  const deadlineLabel = formatDeadline(opportunity.deadline)

  return (
    <TooltipProvider>
      <motion.div
        className="pb-32 md:pb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hero */}
        <div className="px-4 pt-5 pb-6 max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/app"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
          >
            <ArrowLeft className="h-4 w-4" />
            Opportunities
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                {opportunity.company}
              </p>
              <h1 className="text-2xl font-bold text-foreground leading-snug">
                {opportunity.role}
              </h1>
            </div>

            {/* Save button — desktop only (bottom bar handles mobile) */}
            <button
              onClick={handleToggleSave}
              aria-label={saved ? 'Unsave opportunity' : 'Save opportunity'}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer flex-shrink-0 pt-1"
            >
              {saved ? (
                <BookmarkCheck className="h-5 w-5 text-primary" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge variant="secondary" className="rounded-full text-xs font-medium">
              {TYPE_LABELS[opportunity.type]}
            </Badge>

            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {opportunity.location}
              {opportunity.remote && ' · Remote'}
            </span>

            <span
              className={`flex items-center gap-1 text-xs font-medium ${
                opportunity.deadlineUrgent ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              {opportunity.deadlineUrgent ? 'Closes ' : 'Deadline: '}
              {deadlineLabel}
              {opportunity.deadlineUrgent && ' — closing soon'}
            </span>

            {opportunity.diversityFocused && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 text-xs font-medium text-teal-600 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-0.5 cursor-help">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#4A9B8E' }}
                    />
                    Targeted programme
                    <Info className="h-3 w-3" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  {opportunity.diversityNote}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Applied badge */}
          {applied && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-3 py-1">
              <CheckCircle className="h-3.5 w-3.5" />
              Marked as applied
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="px-4 max-w-3xl mx-auto">
          <Tabs defaultValue="match">
            <TabsList className="w-full rounded-xl bg-muted/60 p-1 mb-5">
              <TabsTrigger value="match" className="flex-1 rounded-lg text-sm">
                Why you match
              </TabsTrigger>
              <TabsTrigger value="apply" className="flex-1 rounded-lg text-sm">
                How to apply
              </TabsTrigger>
              <TabsTrigger value="about" className="flex-1 rounded-lg text-sm">
                About this role
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Why you match */}
            <TabsContent value="match" className="space-y-6 mt-0">
              <div className="flex flex-col items-center py-4">
                <FitScoreRing score={opportunity.fitScore} />
              </div>

              {/* Fit reasons */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Why this fits you</h3>
                <ul className="space-y-2.5">
                  {opportunity.fitReasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-teal-muted flex-shrink-0 mt-0.5" style={{ color: '#4A9B8E' }} />
                      <span className="text-sm text-foreground leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gap areas */}
              {opportunity.gapAreas.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Something to build before applying
                  </h3>
                  <ul className="space-y-2.5">
                    {opportunity.gapAreas.map((gap, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <AlertCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground leading-relaxed">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2">
                <Link
                  to={`/app/chat?q=Tell me more about ${encodeURIComponent(opportunity.role)} at ${encodeURIComponent(opportunity.company)}`}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Ask Lighthouse about this opportunity →
                </Link>
              </div>
            </TabsContent>

            {/* Tab 2: How to apply */}
            <TabsContent value="apply" className="space-y-6 mt-0">
              <p className="text-sm text-foreground leading-relaxed">
                {opportunity.description}
              </p>

              <ApplicationChecklist
                opportunityId={opportunity.id}
                tips={opportunity.applicationTips}
              />

              {/* Application tips */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  What they don't put in the job description
                </h3>
                <ol className="space-y-3">
                  {opportunity.applicationTips.map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-11"
              >
                <a
                  href={opportunity.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Apply now
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </TabsContent>

            {/* Tab 3: About this role */}
            <TabsContent value="about" className="space-y-5 mt-0">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">About the programme</h3>
                <p className="text-sm text-foreground leading-relaxed">{opportunity.description}</p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4 space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Key details
                </h4>
                <dl className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">Type</dt>
                    <dd className="font-medium">{TYPE_LABELS[opportunity.type]}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">Location</dt>
                    <dd className="font-medium">
                      {opportunity.location}
                      {opportunity.remote && ' (remote available)'}
                    </dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">Deadline</dt>
                    <dd
                      className={`font-medium ${
                        opportunity.deadlineUrgent ? 'text-red-500' : ''
                      }`}
                    >
                      {deadlineLabel}
                    </dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">Fit score</dt>
                    <dd className="font-medium text-primary">{opportunity.fitScore}% match</dd>
                  </div>
                </dl>
              </div>

              <p className="text-xs text-muted-foreground italic">
                Framing your application: Use the tips in "How to apply" to position your background
                in the most relevant way. Your story is an asset — don't undersell it.
              </p>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl h-11"
              >
                <a
                  href={opportunity.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  View full details on their site
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky bottom bar — mobile */}
        <div className="fixed bottom-16 left-0 right-0 md:hidden z-20 px-4 pb-3 pt-2 bg-background border-t border-border">
          <div className="flex gap-2">
            <button
              onClick={handleToggleSave}
              aria-label={saved ? 'Unsave' : 'Save'}
              className={`flex items-center justify-center gap-1.5 rounded-xl border h-10 px-4 text-sm font-medium transition-colors cursor-pointer flex-1 ${
                saved
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {saved ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={handleMarkApplied}
              disabled={applied || applyingInProgress}
              className={`flex items-center justify-center gap-1.5 rounded-xl border h-10 px-4 text-sm font-medium transition-colors cursor-pointer flex-1 ${
                applied
                  ? 'border-teal-200 text-teal-700 bg-teal-50 cursor-default'
                  : 'border-border text-muted-foreground hover:border-teal-500 hover:text-teal-700 disabled:opacity-50'
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              {applied ? 'Applied' : 'Mark applied'}
            </button>

            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-xl h-10 flex-1 text-sm"
            >
              <a href={opportunity.applicationUrl} target="_blank" rel="noopener noreferrer">
                Apply now
              </a>
            </Button>
          </div>
        </div>

        {/* Desktop sidebar-style actions (shown below content on desktop) */}
        <div className="hidden md:block px-4 pt-6 max-w-3xl mx-auto">
          <div className="flex gap-3">
            <button
              onClick={handleToggleSave}
              className={`flex items-center gap-1.5 rounded-xl border h-10 px-5 text-sm font-medium transition-colors cursor-pointer ${
                saved
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              {saved ? 'Saved' : 'Save for later'}
            </button>

            <button
              onClick={handleMarkApplied}
              disabled={applied || applyingInProgress}
              className={`flex items-center gap-1.5 rounded-xl border h-10 px-5 text-sm font-medium transition-colors cursor-pointer ${
                applied
                  ? 'border-teal-200 text-teal-700 bg-teal-50 cursor-default'
                  : 'border-border text-muted-foreground hover:border-teal-500 hover:text-teal-700 disabled:opacity-50'
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              {applied ? 'Marked as applied' : 'Mark as applied'}
            </button>
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}
