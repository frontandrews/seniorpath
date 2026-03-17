import type { ProgressStatus } from '@prepdeck/schemas'

import { Button } from '@/components/ui/button'
import { testIds } from '@/lib/test-ids'

type StatusTabsProps = {
  activeStatus: ProgressStatus
  counts: Record<ProgressStatus, number>
  onSelect: (status: ProgressStatus) => void
}

const LABELS: Record<ProgressStatus, string> = {
  learned: 'Learned',
  not_learned: 'Not learned',
  partial: 'Partial',
  unseen: 'Unseen',
}

export function StatusTabs({
  activeStatus,
  counts,
  onSelect,
}: StatusTabsProps) {
  const statuses: ProgressStatus[] = ['not_learned', 'partial', 'learned', 'unseen']

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => {
        const isActive = status === activeStatus

        return (
          <Button
            className="rounded-full"
            data-testid={testIds.review.statusTab(status)}
            key={status}
            onClick={() => onSelect(status)}
            type="button"
            variant={isActive ? 'primary' : 'ghost'}
          >
            {LABELS[status]} ({counts[status]})
          </Button>
        )
      })}
    </div>
  )
}
