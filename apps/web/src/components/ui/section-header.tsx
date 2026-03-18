import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionHeaderProps = HTMLAttributes<HTMLDivElement> & {
  action?: ReactNode
  description?: ReactNode
  title: ReactNode
}

export function SectionHeader({
  action,
  className,
  description,
  title,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
      {...props}
    >
      <div className="max-w-3xl">
        <h2 className="app-section-title">{title}</h2>
        {description ? <p className="app-copy mt-2">{description}</p> : null}
      </div>
      {action ? <div className="flex flex-wrap gap-3">{action}</div> : null}
    </div>
  )
}
