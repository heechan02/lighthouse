import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import LighthouseLogo from '@/components/shared/LighthouseLogo'
import StudentRow from './StudentRow'
import StudentDetailPanel from './StudentDetailPanel'
import * as api from '@/lib/api'
import type { AdvisorStudent, StudentTag } from '@/mocks/advisor'
import { Skeleton } from '@/components/ui/skeleton'

type FilterTab = 'all' | 'at-risk' | 'ready-for-1:1' | 'first-gen' | 'final-year'

const filterTabs: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'at-risk', label: 'Needs attention' },
  { id: 'ready-for-1:1', label: 'Ready for 1:1' },
  { id: 'first-gen', label: 'First-gen' },
  { id: 'final-year', label: 'Final year' },
]

function filterStudents(students: AdvisorStudent[], filter: FilterTab): AdvisorStudent[] {
  if (filter === 'all') return students
  return students.filter(s => s.tags.includes(filter as StudentTag))
}

function sortStudents(students: AdvisorStudent[]): AdvisorStudent[] {
  return [...students].sort((a, b) => b.alerts.length - a.alerts.length)
}

export default function AdvisorDashboardPage() {
  const [students, setStudents] = useState<AdvisorStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all')
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    api.getAdvisorStudents().then(data => {
      setStudents(sortStudents(data))
      setLoading(false)
    })
  }, [])

  const filtered = filterStudents(students, activeFilter)
  const selected = students.find(s => s.id === selectedId) ?? null

  function handleSelectStudent(id: string) {
    setSelectedId(id)
    setShowDetail(true)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Advisor nav */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b border-border h-14 flex items-center px-4 md:px-6 gap-3">
        <LighthouseLogo asLink size={28} />
        <span className="text-sm text-muted-foreground font-medium">Advisor View</span>
        <div className="flex-1" />
        <Link
          to="/app"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
          Back to student view
        </Link>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex-1 flex flex-col md:grid md:grid-cols-3 max-w-7xl mx-auto w-full"
      >
        {/* Student list panel */}
        <aside
          className={`md:col-span-1 border-r border-border flex flex-col ${showDetail ? 'hidden md:flex' : 'flex'}`}
        >
          {/* Panel heading */}
          <div className="px-4 pt-6 pb-3">
            <h1 className="text-lg font-bold text-foreground">Your students</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {loading ? '—' : `${students.length} students assigned`}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="px-4 pb-3 flex gap-1.5 overflow-x-auto scrollbar-hide">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  activeFilter === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Student list */}
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            {loading ? (
              <div className="flex flex-col gap-2 px-2 pt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="w-9 h-9 rounded-full" />
                    <div className="flex-1 flex flex-col gap-2">
                      <Skeleton className="h-3.5 w-32 rounded" />
                      <Skeleton className="h-2.5 w-24 rounded" />
                      <Skeleton className="h-1.5 w-full rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">No students match this filter.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {filtered.map(student => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    selected={selectedId === student.id}
                    onClick={() => handleSelectStudent(student.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Detail panel */}
        <main
          className={`md:col-span-2 overflow-y-auto ${!showDetail ? 'hidden md:block' : 'block'}`}
        >
          {/* Mobile back button */}
          {showDetail && (
            <button
              onClick={() => setShowDetail(false)}
              className="md:hidden flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-4 pt-4 focus:outline-none"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
              Back to students
            </button>
          )}

          <StudentDetailPanel student={selected} />
        </main>
      </motion.div>
    </div>
  )
}
