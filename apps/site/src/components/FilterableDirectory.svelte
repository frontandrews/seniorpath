<script lang="ts">
  import { onMount } from 'svelte'
  import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon.svelte'
  import { cn } from '@/lib/cn'
  import { readLocalStorageJson } from '@/lib/local-storage'
  import { ui } from '@/lib/ui'
  import { directoryLinkVariants, directoryListVariants, filterChipVariants } from '@/lib/ui-variants'

  type DirectoryTag = {
    id: string
    label: string
  }

  type DirectoryItem = {
    badgeLabel?: string
    completionId?: string
    ctaLabel?: string
    description?: string
    eyebrow?: string
    href: string
    meta?: string
    tags: DirectoryTag[]
    title: string
  }

  export let items: DirectoryItem[] = []
  export let filterLabel = ''
  export let sectionLabel = ''
  export let completionStorageKey: string | null = null
  export let kind: 'guide-rows' | 'title-cards' = 'title-cards'

  const filterTones = [
    { dark: '#24364f', light: '#dbeafe' },
    { dark: '#2d3358', light: '#dbe4ff' },
    { dark: '#334155', light: '#e2e8f0' },
    { dark: '#1f4556', light: '#e0f2fe' },
    { dark: '#41305a', light: '#ede9fe' },
    { dark: '#274737', light: '#e2f2ea' },
  ]
  const filterLabelClass = ui.eyebrow
  const itemEyebrowClass = ui.eyebrowSentence
  const listClass = directoryListVariants({ kind })
  const guideArticleClass = ui.linearRow
  const itemLinkClass = directoryLinkVariants({ kind })

  let activeFilter: string | null = null
  let completedItemIds = new Set<string>()

  $: filters = Array.from(new Map(items.flatMap((item) => item.tags.map((tag) => [tag.id, tag.label]))).entries()).map(
    ([id, label]) => ({ id, label }),
  )
  $: visibleItems = activeFilter
    ? items.filter((item) => item.tags.some((tag) => tag.id === activeFilter))
    : items

  function toggleFilter(id: string) {
    activeFilter = activeFilter === id ? null : id
  }

  function isComplete(item: DirectoryItem) {
    return Boolean(item.completionId && completedItemIds.has(item.completionId))
  }

  onMount(() => {
    if (!completionStorageKey) {
      return
    }

    completedItemIds = new Set(readLocalStorageJson<string[]>(completionStorageKey, []))
  })
</script>

{#if sectionLabel || filters.length > 0}
  <div class="mb-3 mt-4 grid justify-items-start gap-4">
    {#if sectionLabel || filterLabel}
      <p class={filterLabelClass}>{sectionLabel || filterLabel}</p>
    {/if}
    {#if filters.length > 0}
      <div class="flex flex-wrap justify-start gap-2.5">
        {#each filters as filter, index}
          {@const tone = filterTones[index % filterTones.length]}
          <button
            aria-pressed={filter.id === activeFilter}
            class={filterChipVariants({ active: filter.id === activeFilter })}
            onclick={() => toggleFilter(filter.id)}
            style={`--chip-accent: ${tone.light}; --chip-accent-dark: ${tone.dark};`}
            type="button"
          >
            <span>{filter.label}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<div class={listClass}>
  {#each visibleItems as item}
    {#if kind === 'guide-rows'}
      <article class={cn(guideArticleClass, isComplete(item) && 'is-complete')} data-guide-post={item.completionId}>
        <a class={itemLinkClass} href={item.href}>
          {#if item.eyebrow || item.badgeLabel}
            <div class="flex flex-wrap items-center gap-2">
              {#if item.eyebrow}
                <p class={itemEyebrowClass}>{item.eyebrow}</p>
              {/if}
              {#if item.badgeLabel}
                <span class={ui.contentKindBadge}>
                  {item.badgeLabel}
                </span>
              {/if}
            </div>
          {/if}
          <div class="grid gap-2 md:pr-20">
            <h3 class={cn(ui.linearItemTitle, 'transition-colors duration-150')} data-card-title>
              {item.title}
            </h3>
          </div>
          {#if item.description}
            <p class={ui.cardDescription}>{item.description}</p>
          {/if}
          {#if item.ctaLabel}
            <span class={cn(ui.inlineCta, 'md:hidden')}>
              <span>{item.ctaLabel}</span>
              <ArrowRightIcon className="size-[0.88rem]" />
            </span>
            <span
              class="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 text-[0.76rem] font-medium tracking-[0.04em] text-site-ink-muted opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-site-link-hover group-focus-within:translate-x-0 group-focus-within:opacity-100 group-focus-within:text-site-link-hover md:inline-flex"
            >
              <span>{item.ctaLabel}</span>
              <ArrowRightIcon className="size-[0.88rem]" />
            </span>
          {/if}
        </a>
      </article>
    {:else}
      <a class={itemLinkClass} href={item.href}>
        <div class="grid gap-2">
          <div class="flex items-center justify-between gap-4">
            <h2 class={ui.linkCardTitle}>{item.title}</h2>
            <ArrowRightIcon className="size-4 shrink-0 text-site-ink-muted transition-colors duration-150 group-hover:text-site-link-hover group-focus-within:text-site-link-hover" />
          </div>
          {#if item.description}
            <p class={ui.cardDescription}>{item.description}</p>
          {/if}
          {#if item.meta}
            <p class={ui.cardMeta}>{item.meta}</p>
          {/if}
        </div>
      </a>
    {/if}
  {/each}
</div>
