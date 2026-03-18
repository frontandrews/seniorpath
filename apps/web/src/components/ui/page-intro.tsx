import type { HTMLAttributes, ReactNode } from 'react'

import { Panel } from '@/components/ui/panel'
import { testIds } from '@/lib/test-ids'
import { cn } from '@/lib/utils'

type PageIntroProps = HTMLAttributes<HTMLElement> & {
  actions?: ReactNode
  description?: ReactNode
  eyebrow?: ReactNode
  meta?: ReactNode
  title: ReactNode
}

export function PageIntro({
  actions,
  className,
  description,
  eyebrow,
  meta,
  title,
  ...props
}: PageIntroProps) {
  return (
    <section data-testid={testIds.appShell.pageIntro} {...props}>
      <Panel className={cn('p-5 sm:p-6', className)}>
        {meta ? <div className="mb-4 flex flex-wrap gap-2">{meta}</div> : null}
        {eyebrow ? (
          <p className="app-eyebrow">
            {eyebrow}
          </p>
        ) : null}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="app-page-title">{title}</h1>
            {description ? <p className="app-copy mt-3">{description}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Panel>
    </section>
  )
}
