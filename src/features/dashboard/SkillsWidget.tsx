import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

const skills = [
  { name: 'Case interview frameworks', badge: 'High priority', badgeClass: 'bg-primary/10 text-primary border-primary/20' },
  { name: 'Numerical reasoning', badge: 'Practice needed', badgeClass: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'Professional email writing', badge: 'Quick win', badgeClass: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Consulting frameworks (MECE, issue trees)', badge: 'High priority', badgeClass: 'bg-primary/10 text-primary border-primary/20' },
]

export default function SkillsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
      className="border border-border rounded-2xl bg-background shadow-sm p-5 flex flex-col gap-4"
    >
      <h2 className="text-base font-semibold text-foreground">Skills to build this term</h2>

      <ul className="flex flex-col gap-3" aria-label="Skills list">
        {skills.map((skill) => (
          <li key={skill.name} className="flex items-center justify-between gap-3">
            <span className="text-sm text-foreground">{skill.name}</span>
            <Badge
              variant="outline"
              className={`text-xs whitespace-nowrap flex-shrink-0 ${skill.badgeClass}`}
            >
              {skill.badge}
            </Badge>
          </li>
        ))}
      </ul>

      <Link
        to="/app/interview"
        className="text-sm text-primary font-medium hover:underline focus:outline-none focus-visible:underline"
      >
        Explore mock interviews →
      </Link>
    </motion.div>
  )
}
