# Next.js, SSR, SSG, and related modes

## SSG

Better when:

- content changes rarely
- SEO matters
- the page can be generated ahead of time

Benefits:

- fast response
- lower runtime cost
- strong caching

Costs:

- data may become stale
- rebuilds or revalidation become part of the flow

## SSR

Better when:

- the page depends on per-request data
- server-side personalization matters
- SEO still matters

Benefits:

- fresh HTML per request
- good for auth and personalization

Costs:

- higher cost per request
- backend latency directly affects page delivery

## CSR

Better when:

- SEO is not the priority
- the screen is highly interactive
- client-side data fetching is acceptable

Costs:

- worse first render in many scenarios
- more dependence on client-side JavaScript

## ISR / revalidation

Good for:

- mostly static pages that need periodic updates

## Common question

### How do you choose between SSG and SSR?

Short answer:

`I choose based on personalization needs, how often the data changes, and whether SEO matters. If the content is stable, SSG wins on simplicity and performance. If the HTML must be generated with per-request data, SSR makes more sense.`

## Interview points

- SEO
- cache
- infrastructure cost
- data freshness
- hydration
- streaming
