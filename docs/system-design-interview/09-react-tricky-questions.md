# React Tricky Questions

## What interviewers are often probing

- whether you understand React beyond hooks syntax
- whether you can reason about rendering and state boundaries
- whether you know common footguns

## Why is derived state dangerous?

Short answer:

`Derived state is dangerous when it duplicates a source of truth. It creates synchronization bugs and unnecessary complexity. If a value can be computed from existing state or props, I prefer calculating it instead of storing it.`

## Why can Context hurt performance?

Short answer:

`Context itself is not bad, but broad context updates can rerender large subtrees. I try to keep context narrow, split providers by concern, and avoid turning Context into a global state dump.`

## Why do stale closures happen?

Short answer:

`They happen when a function captures an older value from its lexical scope and keeps using it after state has changed. This often shows up in effects, timers, subscriptions, and callbacks.`

## When is useMemo or useCallback a mistake?

Short answer:

`When they are added by default instead of to solve a measured problem. They add complexity and can make the code harder to reason about. I use them when reference stability or expensive computation actually matters.`

## Why are keys important in lists?

Short answer:

`Keys help React preserve identity across renders. Bad keys, especially array indexes in unstable lists, can create UI bugs, incorrect state reuse, and poor reconciliation behavior.`

## Controlled vs uncontrolled inputs

Good angle:

- controlled inputs are easier to coordinate with validation and state-driven UI
- uncontrolled inputs can be simpler for low-complexity cases
- the tradeoff is control vs simplicity

## Common traps

- storing derived state
- using index as key in dynamic lists
- effect logic that should be event logic
- overusing Context
- memoizing everything
- not understanding server state vs UI state

## Good closing line

`Most React bugs are not about syntax. They come from incorrect state ownership, poor boundaries, and misunderstanding what actually causes work during rendering.`
