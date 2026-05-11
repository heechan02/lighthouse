import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="border border-border rounded-2xl p-4 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-64" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-9 w-32 rounded-xl" />
          <Skeleton className="h-9 w-40 rounded-xl" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-36" />
        <div className="flex gap-3 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-36 w-60 flex-shrink-0 rounded-2xl" />
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">Loading your dashboard…</p>
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-start gap-2.5">
        <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
        <Skeleton className="h-16 w-64 rounded-2xl rounded-tl-sm" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-48 rounded-2xl rounded-tr-sm" />
      </div>
      <div className="flex items-start gap-2.5">
        <Skeleton className="w-7 h-7 rounded-full flex-shrink-0" />
        <Skeleton className="h-24 w-72 rounded-2xl rounded-tl-sm" />
      </div>
      <p className="text-xs text-muted-foreground text-center">Loading your conversation…</p>
    </div>
  )
}

export function RoadmapSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-3 w-full rounded-full" />
        <Skeleton className="h-4 w-36" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="border border-border rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
      <p className="text-xs text-muted-foreground text-center">Loading your roadmap…</p>
    </div>
  )
}

export function OpportunitySkeleton() {
  return (
    <div className="w-60 flex-shrink-0 border border-border rounded-2xl p-4 space-y-3">
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <Skeleton className="h-3 w-28" />
    </div>
  )
}
