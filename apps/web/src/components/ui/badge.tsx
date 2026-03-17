import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'default' | 'accent' | 'danger' | 'success' | 'warning'
}

const toneClassName: Record<NonNullable<BadgeProps['tone']>, string> = {
  accent:
    'bg-[var(--retro-accent-soft)] text-[var(--retro-ink)] border-[var(--retro-line-strong)]',
  danger: 'bg-[color:rgba(155,103,120,0.22)] text-white border-[var(--retro-danger)]',
  default:
    'bg-[color:rgba(255,255,255,0.04)] text-[var(--retro-ink)] border-[var(--retro-line)]',
  success: 'bg-[color:rgba(96,141,159,0.22)] text-white border-[var(--retro-success)]',
  warning: 'bg-[color:rgba(101,121,153,0.22)] text-white border-[var(--retro-warning)]',
}

export function Badge({ className, tone = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border-2 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]',
        toneClassName[tone],
        className,
      )}
      {...props}
    />
  )
}
