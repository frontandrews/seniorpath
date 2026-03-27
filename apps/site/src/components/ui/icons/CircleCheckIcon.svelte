<script lang="ts">
  type Props = {
    className?: string
  }

  let { className = 'size-4 shrink-0' }: Props = $props()
</script>

<svg
  aria-hidden="true"
  class={className}
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  viewBox="0 0 24 24"
>
  <circle cx="12" cy="12" r="9"></circle>
  <path d="m9 12 2 2 4-4"></path>
</svg>
