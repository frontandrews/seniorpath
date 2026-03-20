const linearCard =
  'relative -mx-[0.45rem] grid gap-[0.35rem] rounded-[var(--radius-sm)] px-[0.45rem] py-[0.8rem] min-[64rem]:gap-[0.5rem] min-[64rem]:px-[0.55rem] min-[64rem]:py-[0.95rem]'

export const uiRecipes = {
  actionLink:
    'inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-site-ink transition-colors duration-150 hover:bg-site-hover hover:text-site-link-hover focus-visible:bg-site-hover focus-visible:text-site-link-hover focus-visible:outline-none min-[64rem]:px-3 min-[64rem]:text-[0.86rem]',
  badge:
    'inline-flex min-h-8 items-center rounded-full border border-site-line bg-site-card px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-site-ink min-[64rem]:min-h-[2.15rem] min-[64rem]:px-3.5 min-[64rem]:text-[0.78rem]',
  badgeLink:
    'transition-colors duration-150 hover:border-site-line-strong hover:bg-site-hover hover:text-site-link-hover',
  contentKindBadge:
    'inline-flex w-fit items-center rounded-full border border-site-line bg-site-card px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-site-ink-subtle min-[64rem]:px-3 min-[64rem]:text-[0.72rem]',
  inlineCta:
    'mt-0.5 inline-flex items-center gap-1.5 text-[0.76rem] font-medium tracking-[0.04em] text-site-ink-muted transition-colors duration-150 group-hover:text-site-link-hover group-focus-within:text-site-link-hover min-[64rem]:text-[0.84rem]',
  linearCard,
  linearCardInteractive: `${linearCard} text-inherit transition-colors duration-150 hover:bg-site-hover hover:text-site-link-hover focus-visible:bg-site-hover focus-visible:text-site-link-hover focus-visible:outline-none`,
  linearRow: 'group h-full border-t border-site-line bg-transparent first:border-t-0',
  panel: 'rounded-[var(--radius)] border border-site-line bg-site-panel',
  titleCardLink:
    'group block rounded-[var(--radius)] border border-site-line bg-site-panel px-5 py-6 text-inherit transition-colors duration-150 hover:border-site-line-strong hover:bg-site-hover hover:text-site-link-hover focus-visible:border-site-line-strong focus-visible:bg-site-hover focus-visible:text-site-link-hover focus-visible:outline-none min-[64rem]:px-6 min-[64rem]:py-7',
  toolbar: 'grid gap-2 rounded-[var(--radius)] border border-site-line bg-site-panel px-5 py-4 min-[64rem]:gap-3 min-[64rem]:px-6 min-[64rem]:py-5',
} as const
