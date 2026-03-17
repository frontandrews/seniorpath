import type { HTMLAttributes } from 'react'

import { Card } from '@/components/retroui/Card'
import { cn } from '@/lib/utils'

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  inset?: boolean
}

export function Panel({ className, inset = false, ...props }: PanelProps) {
  return (
    <Card
      className={cn(
        'block border-[var(--retro-line-strong)] bg-[var(--retro-surface)]',
        inset && 'bg-[var(--retro-surface-muted)]',
        className,
      )}
      {...props}
    />
  )
}
