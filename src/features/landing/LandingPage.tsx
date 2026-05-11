import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Map, BookOpen, Compass } from 'lucide-react'
import LighthouseLogo from '@/components/shared/LighthouseLogo'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <LighthouseLogo asLink size={28} />
          <nav className="flex items-center gap-2">
            <Link
              to="/advisor"
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              For advisors
            </Link>
            <Link
              to="/onboarding"
              className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start your journey
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center gap-5"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-widest uppercase text-primary"
          >
            Your career companion
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl"
          >
            Some students inherit a map.
            <br />
            <span className="text-primary">We're building one for everyone else.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Lighthouse guides you through the hidden curriculum of professional life
            — from Week 1, not final year.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3 pt-2"
          >
            <Link
              to="/onboarding"
              className="inline-block px-8 py-4 text-base font-medium bg-primary text-white rounded-2xl hover:bg-primary/90 transition-colors"
            >
              Start your journey →
            </Link>
            <p className="text-sm text-muted-foreground">
              Free for students. Takes 5 minutes to set up.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[
            {
              icon: Map,
              title: 'Your personalised roadmap',
              body: 'A term-by-term plan built around your background, goals, and timeline. Updates as you grow.',
            },
            {
              icon: BookOpen,
              title: 'The hidden curriculum, decoded',
              body: 'Spring weeks. Cold emails. When to apply. The things no one tells you — explained in plain language.',
            },
            {
              icon: Compass,
              title: 'Opportunities matched to you',
              body: 'Internships, insight days, and programmes — including diversity-focused ones — surfaced when they matter.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-border bg-white shadow-sm p-6 flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-base">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* For students like you */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold max-w-xl">
              Built for students who don't have all the answers yet.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible"
          >
            {[
              {
                name: 'Amara',
                role: 'Second-year Business student, first in her family at uni',
                quote:
                  "Didn't know what a spring week was until Lighthouse told her. Now she has two applications in.",
              },
              {
                name: 'Marcus',
                role: 'Mature student, Finance, switching from retail management',
                quote:
                  'Lighthouse helped him translate his work experience into language recruiters understand.',
              },
              {
                name: 'Priya',
                role: 'International student, Computer Science',
                quote:
                  "Found two diversity programmes she'd never heard of. One application turned into an interview.",
              },
            ].map(({ name, role, quote }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-border bg-background p-5 flex flex-col gap-2 min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                  {name[0]}
                </div>
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
                <p className="text-sm leading-relaxed mt-1 text-foreground/80">"{quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advisor CTA */}
      <section className="bg-amber-50 py-14 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="max-w-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Are you a careers advisor?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Lighthouse gives your team a clear view of every student's progress — and flags who
              needs support before it's too late.
            </p>
          </div>
          <Link
            to="/advisor"
            className="inline-block px-6 py-3 text-sm font-medium border border-primary text-primary rounded-2xl hover:bg-primary hover:text-white transition-colors whitespace-nowrap self-start md:self-auto"
          >
            See the advisor dashboard →
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <LighthouseLogo size={24} />
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-muted-foreground">
            <span>Made for students who deserve better.</span>
            <span className="hidden sm:inline">·</span>
            <span>© 2025 Lighthouse</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
