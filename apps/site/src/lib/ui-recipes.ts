const linearCard = 'relative -mx-[0.45rem] grid gap-[0.35rem] rounded-[0.85rem] px-[0.45rem] py-[0.8rem]'

export const uiRecipes = {
  actionLink:
    'inline-flex items-center rounded-xl px-2.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-site-ink transition-colors duration-150 hover:bg-site-hover hover:text-site-link-hover focus-visible:bg-site-hover focus-visible:text-site-link-hover focus-visible:outline-none',
  badge:
    'inline-flex min-h-8 items-center rounded-full border border-site-line bg-site-card px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-site-ink',
  badgeLink:
    'transition-colors duration-150 hover:border-site-line-strong hover:bg-site-hover hover:text-site-link-hover',
  contentKindBadge:
    'inline-flex w-fit items-center rounded-full border border-site-line bg-site-card px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-site-ink',
  inlineCta:
    'mt-0.5 inline-flex items-center gap-1.5 text-[0.76rem] font-medium tracking-[0.04em] text-site-ink-muted transition-colors duration-150 group-hover:text-site-link-hover group-focus-within:text-site-link-hover',
  linearCard,
  linearCardInteractive: `${linearCard} text-inherit transition-colors duration-150 hover:bg-site-hover hover:text-site-link-hover focus-visible:bg-site-hover focus-visible:text-site-link-hover focus-visible:outline-none`,
  linearRow: 'group h-full border-t border-site-line bg-transparent first:border-t-0',
  panel: 'rounded-[var(--radius)] border border-site-line bg-site-panel',
  titleCardLink:
    'group block rounded-[1rem] border border-site-line bg-site-panel px-5 py-6 text-inherit transition-colors duration-150 hover:border-site-line-strong hover:bg-site-hover hover:text-site-link-hover focus-visible:border-site-line-strong focus-visible:bg-site-hover focus-visible:text-site-link-hover focus-visible:outline-none',
  toolbar: 'grid gap-2 rounded-[var(--radius)] border border-site-line bg-site-panel px-5 py-4',
} as const
