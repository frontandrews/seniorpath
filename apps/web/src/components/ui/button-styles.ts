import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[0.95rem] border-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition active:translate-x-[2px] active:translate-y-[2px] disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
    variants: {
      size: {
        default: 'min-h-12',
        sm: 'min-h-10 px-3 py-2 text-xs',
      },
      variant: {
        primary:
          'border-[var(--retro-line-strong)] bg-[var(--retro-accent)] text-white shadow-[4px_4px_0_var(--retro-shadow)] hover:bg-[var(--retro-accent-strong)]',
        secondary:
          'border-[var(--retro-line-strong)] bg-[var(--retro-surface-muted)] text-[var(--retro-ink)] shadow-[4px_4px_0_var(--retro-shadow)] hover:bg-[var(--retro-surface-strong)]',
        ghost:
          'border-[var(--retro-line)] bg-[color:rgba(255,255,255,0.04)] text-[var(--retro-ink)] shadow-[4px_4px_0_var(--retro-line)] hover:bg-[color:rgba(255,255,255,0.08)]',
        danger:
          'border-[var(--retro-line-strong)] bg-[var(--retro-danger)] text-white shadow-[4px_4px_0_var(--retro-shadow)] hover:brightness-110',
        success:
          'border-[var(--retro-line-strong)] bg-[var(--retro-success)] text-white shadow-[4px_4px_0_var(--retro-shadow)] hover:brightness-105',
        warning:
          'border-[var(--retro-line-strong)] bg-[var(--retro-warning)] text-white shadow-[4px_4px_0_var(--retro-shadow)] hover:brightness-105',
      },
    },
  },
)
