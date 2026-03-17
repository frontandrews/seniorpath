# State Management

## Base rule

The best state is the smallest amount of state necessary.

## When to use each type

### Local state

Use it when:

- the state belongs to one component or a small subtree
- it is temporary or UI-specific

Examples:

- open modal
- selected tab
- controlled input

### Context

Use it when:

- multiple layers need the same dependency
- shared reading is simple

Examples:

- theme
- session
- locale

Risk:

- turning into a disguised global store

### Global store

Use it when:

- multiple parts of the app read and write the same state
- cross-screen synchronization matters
- update rules need to stay centralized

Examples:

- shopping cart
- global filters
- complex session data

## Common question

### Redux, Zustand, Context, or React Query?

Answer direction:

- React Query does not replace UI state; it solves server state
- Context solves simple sharing, not complex state flows by itself
- a global store makes sense when synchronization and complexity justify it

## Server state vs client state

### Server state

- comes from an API
- needs cache, stale handling, refetch, and retries

### Client state

- local interaction
- wizard flow
- modal
- UI preference

## Common mistakes

- duplicating state
- storing derived state instead of calculating it
- lifting state too early
- using a global store just for convenience
