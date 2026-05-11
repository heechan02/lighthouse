import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import MilestoneAccordion from './MilestoneAccordion'
import RoadmapDetailSheet from './RoadmapDetailSheet'
import { RoadmapSkeleton } from '@/components/shared/PageLoader'
import * as api from '@/lib/api'
import type { Milestone, RoadmapTask, TaskStatus } from '@/mocks/roadmap'

export default function RoadmapPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState<RoadmapTask | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    api.getRoadmap().then(data => {
      setMilestones(data)
      setLoading(false)
    })
  }, [])

  const handleTaskStatusChange = (taskId: string, status: TaskStatus) => {
    setMilestones(prev =>
      prev.map(m => ({
        ...m,
        tasks: m.tasks.map(t => (t.id === taskId ? { ...t, status } : t)),
      }))
    )
    // Also update the selected task in the sheet if open
    if (selectedTask?.id === taskId) {
      setSelectedTask(prev => prev ? { ...prev, status } : prev)
    }
  }

  const handleOpenDetail = (task: RoadmapTask) => {
    setSelectedTask(task)
    setSheetOpen(true)
  }

  // Compute overall progress
  const allTasks = milestones.flatMap(m => m.tasks)
  const totalTasks = allTasks.length
  const doneTasks = allTasks.filter(t => t.status === 'complete').length
  const progressPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0
  const currentPhase = milestones.find(m => m.tasks.some(t => t.status !== 'complete'))?.phase ?? 3

  if (loading) {
    return (
      <div className="px-4 sm:px-6 py-6 max-w-2xl mx-auto">
        <RoadmapSkeleton />
      </div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 sm:px-6 py-6 max-w-2xl mx-auto space-y-6 pb-24 md:pb-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Roadmap</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Phase {currentPhase} of 3 · Follow this to stay ahead
          </p>
        </div>

        {/* Overall progress */}
        <div className="border border-border rounded-2xl p-5 bg-background space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{progressPct}% complete</span>
            <span className="text-xs text-muted-foreground">{doneTasks} of {totalTasks} tasks done</span>
          </div>
          <Progress value={progressPct} className="h-2" />

          {/* Phase indicators */}
          <div className="flex gap-2 pt-1">
            {milestones.map(m => {
              const mDone = m.tasks.filter(t => t.status === 'complete').length
              const mTotal = m.tasks.length
              const isActive = m.phase === currentPhase
              const isComplete = mDone === mTotal
              return (
                <div key={m.id} className="flex-1">
                  <div className={`h-1.5 rounded-full transition-colors duration-300 ${
                    isComplete ? 'bg-[#4A9B8E]' : isActive ? 'bg-primary' : 'bg-border'
                  }`} />
                  <p className={`text-xs mt-1.5 font-medium ${
                    isActive ? 'text-primary' : isComplete ? 'text-[#4A9B8E]' : 'text-muted-foreground'
                  }`}>
                    Phase {m.phase}
                  </p>
                  <p className="text-xs text-muted-foreground">{m.title}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Milestone accordions */}
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <MilestoneAccordion
              key={milestone.id}
              milestone={milestone}
              defaultOpen={milestone.phase === 1}
              onTaskStatusChange={handleTaskStatusChange}
              onOpenDetail={handleOpenDetail}
            />
          ))}
        </div>

        {/* Ask Lighthouse CTA */}
        <div className="border border-border rounded-2xl p-5 bg-background flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MessageCircle size={18} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Not sure what to do next?</p>
            <p className="text-xs text-muted-foreground mt-0.5">Ask Lighthouse to explain any task or help you prioritise.</p>
          </div>
          <Link
            to="/app/chat"
            className="shrink-0 text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            Ask →
          </Link>
        </div>
      </motion.div>

      {/* Detail sheet */}
      <RoadmapDetailSheet
        task={selectedTask}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onStatusChange={handleTaskStatusChange}
      />
    </>
  )
}
