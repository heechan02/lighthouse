import { useUser } from './AppShell'
import LighthouseLogo from '@/components/shared/LighthouseLogo'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function TopNav() {
  const user = useUser()

  return (
    <header className="sticky top-0 z-10 h-14 bg-background border-b border-border flex items-center justify-between px-4">
      <LighthouseLogo size={28} asLink />
      <div className="flex items-center gap-2">
        {user && (
          <>
            <span className="text-sm text-muted-foreground hidden sm:block">{user.name}</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-semibold">{getInitials(user.name)}</span>
            </div>
          </>
        )}
        {!user && (
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        )}
      </div>
    </header>
  )
}
