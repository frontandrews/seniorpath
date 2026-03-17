import { cn } from '@/lib/utils'

type ProgressMeterProps = {
  className?: string
  current: number
  total: number
}

export function ProgressMeter({
  className,
  current,
  total,
}: ProgressMeterProps) {
  const ratio = total > 0 ? Math.min(100, Math.max(0, Math.round((current / total) * 100))) : 0

  return (
    <div
      aria-label={`${current} of ${total} complete`}
      className={cn(
        'h-3 w-full overflow-hidden rounded-full border-2 border-[var(--retro-line)] bg-[color:rgba(255,255,255,0.04)]',
        className,
      )}
      role="progressbar"
      aria-valuemax={total}
      aria-valuemin={0}
      aria-valuenow={current}
    >
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--retro-accent),var(--retro-accent-strong))] transition-[width]"
        style={{ width: `${ratio}%` }}
      />
    </div>
  )
}
