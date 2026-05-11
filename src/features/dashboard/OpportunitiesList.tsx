import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import OpportunityCard from '@/components/shared/OpportunityCard'
import type { Opportunity } from '@/mocks/opportunities'

interface OpportunitiesListProps {
  opportunities: Opportunity[]
}

export default function OpportunitiesList({ opportunities }: OpportunitiesListProps) {
  const navigate = useNavigate()
  const topThree = opportunities.slice(0, 3)

  return (
    <section aria-label="Matched opportunities">
      <h2 className="text-base font-semibold text-foreground mb-3">Matched for you</h2>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scroll-smooth snap-x snap-mandatory">
        {topThree.map((opp, i) => (
          <motion.div
            key={opp.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08, ease: 'easeOut' }}
            className="snap-start flex-shrink-0"
          >
            <OpportunityCard opportunity={opp} onClick={() => navigate(`/app/opportunities/${opp.id}`)} />
          </motion.div>
        ))}
      </div>

      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {topThree.map((opp, i) => (
          <motion.div
            key={opp.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08, ease: 'easeOut' }}
          >
            <OpportunityCard opportunity={opp} onClick={() => navigate(`/app/opportunities/${opp.id}`)} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
