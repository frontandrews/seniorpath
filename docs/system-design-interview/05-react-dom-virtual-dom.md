# React DOM e Virtual DOM
# React DOM and Virtual DOM

## Virtual DOM

Short definition:

- an in-memory representation of the desired UI
- React compares changes and decides the smallest set of updates for the real DOM

## Real DOM

- the browser updates layout, paint, and composition
- touching the real DOM is more expensive than comparing lightweight structures in memory

## What matters in interviews

Do not say the Virtual DOM is always fast.

Better answer:

`The Virtual DOM helps make updates predictable and efficient, but real performance still depends on how state is modeled, how many components rerender, and how much work the browser has to do.`

## Common questions

### Does the Virtual DOM eliminate performance problems?

- no
- it helps with reconciliation
- it does not fix bad state modeling, huge trees, or expensive effects

### What causes a rerender?

- props change
- state changes
- context changes
- parent rerenders

### How do you think about React performance?

- reduce work, not just rerenders
- model state better
- isolate components
- avoid heavy work during render
- use memoization only with a real bottleneck
