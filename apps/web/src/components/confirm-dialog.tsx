import { Button } from '@/components/ui/button'
import { Panel } from '@/components/ui/panel'

type ConfirmDialogProps = {
  cancelLabel?: string
  confirmLabel: string
  description: string
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  title: string
}

export function ConfirmDialog({
  cancelLabel = 'Cancel',
  confirmLabel,
  description,
  isOpen,
  onCancel,
  onConfirm,
  title,
}: ConfirmDialogProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/55 p-4 backdrop-blur-sm sm:items-center sm:justify-center">
      <Panel
        aria-modal="true"
        className="w-full max-w-md bg-[var(--retro-surface)] p-5"
        role="dialog"
      >
        <h2 className="text-xl font-black text-[var(--retro-ink)]">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-white/80">
          {description}
        </p>
        <div className="mt-6 flex gap-3">
          <Button className="flex-1" onClick={onCancel} type="button" variant="secondary">
            {cancelLabel}
          </Button>
          <Button className="flex-1" onClick={onConfirm} type="button" variant="danger">
            {confirmLabel}
          </Button>
        </div>
      </Panel>
    </div>
  )
}
