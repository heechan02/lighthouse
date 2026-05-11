import { NavLink } from 'react-router-dom'
import { Home, Map, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/roadmap', label: 'Roadmap', icon: Map, end: false },
  { to: '/app/chat', label: 'Ask', icon: MessageCircle, end: false },
]

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-background border-t border-border flex">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              'flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )
          }
        >
          <Icon size={20} />
          <span className="text-xs font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
