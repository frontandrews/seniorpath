---
title: React Derived State Without Extra Bugs
description: Why copying props into state often creates more problems than it solves, and what to reach for instead.
summary: A cleaner mental model for derived state questions in React interviews.
guideId: react-derived-state
locale: en
status: archived
pubDate: 2026-02-13
updatedDate: 2026-02-18
category: State & UI Thinking
topic: React
path:
  - State & UI Thinking
  - State Ownership
order: 10
relationships:
  - javascript-event-loop
tags:
  - react
  - state
  - rendering
topicIds:
  - react
relatedDeckIds:
  - react-rendering-core
---

Derived state usually sounds completely harmless when you first hear the idea.

You already have some input coming from props, you need a value that looks slightly different for the UI, and dumping it into a new `useState` feels like the most straightforward move.
The fatal problem is that you have now created two places that both look like the absolute truth.

That architectural trap is exactly what interviewers are trying to catch when they ask about React state management.

## What goes wrong

When a developer copies props into local state, the component is suddenly burdened with keeping those two values perfectly synchronized over time.

That inevitably produces one of these outcomes:

- the copied local value goes stale immediately after a parent prop change
- a messy `useEffect` gets added just to forcefully keep the state in sync
- bizarre edge cases appear around resetting the form or component logic
- the component becomes a nightmare to reason about because the “real” value is no longer obvious

The bug isn't just a rendering glitch. It is an architectural failure. You drastically increased the number of moving parts for something that could have simply been computed on the fly during the render cycle.

## The better default

Store the absolute smallest source of truth possible, and forcefully derive everything else from it.

If the derived value is cheap (like filtering an array of 50 items), compute it directly during render:

```tsx
function UserList({ users, search }: { users: User[]; search: string }) {
  const visibleUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  )

  return <Results users={visibleUsers} />
}
```

If the computation is genuinely expensive (like parsing thousands of records), `useMemo` is usually the exact right tool to reach for before you ever consider adding more state:

```tsx
const visibleUsers = useMemo(() => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  )
}, [users, search])
```

## When state is actually justified

Sometimes you are *not* just storing a derived value. You are storing a user-controlled draft, a local interaction state, or a value that intentionally, permanently diverges from the initial prop.

That is a completely different scenario.

For example:

- a form starts with server data, but the user immediately begins editing it locally
- a modal starts open or closed based on a prop, but then becomes totally controlled by the user's clicks
- you are building optimistic UI state that temporarily diverges from the backend's real truth

In those cases, the answer isn't “never use state.” The answer is “be aggressively explicit about exactly *why* that duplicated state exists.”

## Strong interview framing

A highly senior answer in an interview sounds like this:

> "Derived state is inherently dangerous because it duplicates something that could already be computed from props or existing state, leading to synchronization nightmares and stale UI. My default is to keep the source of truth as brutally small as possible, derive values directly during render, and only add memoization or separate state when there is a mathematically proven performance or UX reason to do so."

That framing proves you understand the painful tradeoffs of state ownership, not just the React documentation slogans.
