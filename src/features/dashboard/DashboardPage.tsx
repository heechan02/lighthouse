import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, Lightbulb } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { DashboardSkeleton } from '@/components/shared/PageLoader'
import NextStepCard from './NextStepCard'
import OpportunitiesList from './OpportunitiesList'
import SkillsWidget from './SkillsWidget'
import * as api from '@/lib/api'
import type { UserProfile } from '@/mocks/user'
import type { Milestone, RoadmapTask } from '@/mocks/roadmap'
import type { Opportunity } from '@/mocks/opportunities'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function getNextTask(milestones: Milestone[]): RoadmapTask | null {
  for (const milestone of milestones) {
    const task = milestone.tasks.find(t => t.status === 'in_progress' || t.status === 'not_started')
    if (task) return task
  }
  return null
}

function getRecentlyCompleted(milestones: Milestone[]): RoadmapTask[] {
  const completed: RoadmapTask[] = []
  for (const milestone of milestones) {
    for (const task of milestone.tasks) {
      if (task.status === 'complete') completed.push(task)
    }
  }
  return completed.slice(-2)
}

function getUpcomingDeadlines(opportunities: Opportunity[]) {
  return [...opportunities]
    .filter(o => !o.appliedAt)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3)
}

const todaysInsight = "Spring week applications close in October — most students don't find out until it's too late. You're already ahead by knowing."

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [profile, roadmap, opps] = await Promise.all([
        api.getProfile(),
        api.getRoadmap(),
        api.getOpportunities(),
      ])
      setUser(profile)
      setMilestones(roadmap)
      setOpportunities(opps)
      setLoading(false)
    }
    load()
  }, [])

  function handleTaskComplete(taskId: string) {
    setMilestones(prev =>
      prev.map(m => ({
        ...m,
        tasks: m.tasks.map(t => t.id === taskId ? { ...t, status: 'complete' as const } : t),
      }))
    )
  }

  if (loading) return <DashboardSkeleton />

  const nextTask = getNextTask(milestones)
  const recentlyCompleted = getRecentlyCompleted(milestones)
  const upcomingDeadlines = getUpcomingDeadlines(opportunities)
  const currentMilestone = milestones.find(m => m.phase === (user?.currentPhase ?? 1))

  const phaseCompleted = currentMilestone?.tasks.filter(t => t.status === 'complete').length ?? 0
  const phaseTotal = currentMilestone?.tasks.length ?? 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="px-4 py-6 md:px-6 md:py-8 max-w-7xl mx-auto"
    >
      <div className="md:grid md:grid-cols-3 md:gap-8">
        {/* Main content — 2 cols on desktop */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* Greeting */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              {getGreeting()}, {user?.name.split(' ')[0]}.
            </h1>
            <p className="text-muted-foreground text-base">
              You're in Phase {user?.currentPhase} — {currentMilestone?.title}. Here's what matters this week.
            </p>
          </div>

          {/* Next step card */}
          {nextTask ? (
            <NextStepCard task={nextTask} onComplete={handleTaskComplete} />
          ) : (
            <div className="border border-border rounded-2xl p-5 bg-background shadow-sm text-center">
              <p className="text-muted-foreground text-sm">
                All tasks in Phase {user?.currentPhase} are complete. You're doing great.
              </p>
            </div>
          )}

          {/* Roadmap progress strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
            className="border border-border rounded-2xl bg-background shadow-sm p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-foreground">
                  {user?.roadmapProgress}% through Phase {user?.currentPhase} · {currentMilestone?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {phaseCompleted} of {phaseTotal} tasks complete
                </p>
              </div>
              <div className="flex gap-2 items-center">
                {[1, 2, 3].map(phase => (
                  <div
                    key={phase}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      phase === user?.currentPhase
                        ? 'bg-primary text-white'
                        : phase < (user?.currentPhase ?? 1)
                        ? 'bg-[#4A9B8E]/20 text-[#4A9B8E]'
                        : 'bg-muted text-muted-foreground'
                    }`}
                    aria-label={`Phase ${phase}`}
                  >
                    {phase}
                  </div>
                ))}
              </div>
            </div>
            <Progress value={user?.roadmapProgress ?? 0} className="h-2 rounded-full" />
            <Link
              to="/app/roadmap"
              className="text-sm text-primary font-medium hover:underline focus:outline-none focus-visible:underline self-start"
            >
              View full roadmap →
            </Link>
          </motion.div>

          {/* Opportunities list */}
          <OpportunitiesList opportunities={opportunities} />

          {/* Ask Lighthouse CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25, ease: 'easeOut' }}
            className="border border-border rounded-2xl bg-amber-50/60 p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex items-start gap-3 flex-1">
              <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden />
              <p className="text-sm text-foreground">
                Have a question? Ask anything about careers, applications, or the industry.
              </p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-xl min-h-[44px] px-5 flex-shrink-0">
              <Link to="/app/chat">
                Ask Lighthouse <ArrowRight className="w-4 h-4 ml-1" aria-hidden />
              </Link>
            </Button>
          </motion.div>

          {/* Skills widget — shown inline on mobile, in sidebar on desktop */}
          <div className="md:hidden">
            <SkillsWidget />
          </div>
        </div>

        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex flex-col gap-6" aria-label="Dashboard sidebar">

          {/* Upcoming deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
            className="border border-border rounded-2xl bg-background shadow-sm p-5 flex flex-col gap-4"
          >
            <h2 className="text-base font-semibold text-foreground">Upcoming deadlines</h2>
            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming deadlines.</p>
            ) : (
              <ul className="flex flex-col gap-3" aria-label="Upcoming deadlines list">
                {upcomingDeadlines.map(opp => {
                  const dl = new Date(opp.deadline)
                  const label = dl.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                  return (
                    <li key={opp.id} className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <span className="text-sm text-foreground font-medium truncate">{opp.company}</span>
                        <span className="text-xs text-muted-foreground truncate">{opp.role}</span>
                      </div>
                      <span className={`text-xs font-medium flex-shrink-0 px-2 py-0.5 rounded-full ${opp.deadlineUrgent ? 'text-red-600 bg-red-50' : 'text-muted-foreground bg-muted'}`}>
                        {label}
                      </span>
                    </li>
                  )
                })}
              </ul>
            )}
          </motion.div>

          {/* Recent activity */}
          {recentlyCompleted.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
              className="border border-border rounded-2xl bg-background shadow-sm p-5 flex flex-col gap-4"
            >
              <h2 className="text-base font-semibold text-foreground">Recently completed</h2>
              <ul className="flex flex-col gap-2" aria-label="Recently completed tasks">
                {recentlyCompleted.map(task => (
                  <li key={task.id} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-[#4A9B8E] flex-shrink-0 mt-1.5" aria-hidden />
                    <span>{task.title}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Today's insight */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25, ease: 'easeOut' }}
            className="border border-border rounded-2xl bg-amber-50/60 p-5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" aria-hidden />
              <h2 className="text-sm font-semibold text-foreground">Today's insight</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">"{todaysInsight}"</p>
          </motion.div>

          {/* Skills widget */}
          <SkillsWidget />
        </aside>
      </div>
    </motion.div>
  )
}
