import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  inset?: boolean
}

export function Panel({ className, inset = false, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-[1.6rem] border-2 border-[var(--retro-line-strong)] bg-[var(--retro-surface)] shadow-[6px_6px_0_var(--retro-shadow-soft)]',
        inset &&
          'bg-[var(--retro-surface-muted)] shadow-[inset_0_0_0_2px_var(--retro-line),6px_6px_0_var(--retro-shadow-soft)]',
        className,
      )}
      {...props}
    />
  )
}
