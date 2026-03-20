---
title: Effects Without Mess
description: How to use effects without turning synchronization, fetches, and side events into a pile of hard-to-predict behavior.
summary: A good effect synchronizes with the outside world. A bad effect tries to control the whole screen.
guideId: effects-without-the-mess
locale: en
status: active
pillarId: state-and-ui-thinking
branchId: effects-and-side-effects
pubDate: 2026-01-24
updatedDate: 2026-01-26
category: State and UI
topic: Effects
path:
  - State and UI
  - Effects Without Mess
order: 10
relationships:
  - state-ownership-without-confusion
  - server-and-client-thinking-without-confusion
tags:
  - react
  - effects
  - ui
topicIds:
  - react
relatedDeckIds: []
---

## The problem

A \`useEffect\` turns into an absolute nightmare when developers start using it as a duct-tape tool to fix anything behaving strangely on the screen.

Suddenly, you have effects doing everything: deriving state, manually synchronizing variables that shouldn't even exist, and desperately trying to patch render execution orders.

The code might technically work today, but it quickly becomes impossible to predict *when* something runs and *why* it ran.

## Mental model

An effect does not exist to control the React render cycle.

An effect exists strictly to step outside of React and synchronize the interface with the external world:

- making a network request
- starting a \`setInterval\` timer
- attaching a global window listener
- imperatively mutating a third-party DOM library

If the logic can be predictably calculated during a normal render pass or cleanly handled inside a direct button click handler, it absolutely does not belong in an effect.

## Breaking it down

Before blindly typing \`useEffect\`, violently cross-examine your code:

1. What exact external, non-React system am I trying to synchronize with?
2. Could I just mathematically calculate this value during the standard render cycle?
3. Should this action only fire because the user specifically clicked a button?
4. Is the cleanup function completely obvious for when this component unmounts?

Answering these honestly will eliminate 80% of unnecessary, buggy effects.

## Simple example

Look at this painfully common trap:

```tsx
const [filteredUsers, setFilteredUsers] = useState<User[]>([])

useEffect(() => {
  setFilteredUsers(users.filter((user) => user.name.includes(search)))
}, [users, search])
```

It looks harmless, but `filteredUsers` is entirely derived from `users` and `search`.

By doing this, you are explicitly forcing React into an unnecessary second render pass just to keep a piece of invented state manually synchronized.

The senior, predictable version simply calculates it on the fly:

```tsx
const filteredUsers = users.filter((user) => user.name.includes(search))
```

Now the code is vastly easier to read, and a totally unnecessary re-render disappears.

## Common mistakes

- aggressively using effects to derive or mirror state
- shoving user event logic (like submitting a form) inside an effect instead of the `onClick` handler
- relying on an effect's dependency array to magically "fix" broken render orders
- recklessly forgetting the cleanup function in timers, subscriptions, or event listeners

## How a senior thinks

A strong senior UI engineer doesn't stare at an effect asking "what dependencies am I missing in this array?"

They ask:

> "Am I actually synchronizing this component with an external system, or am I just using an effect to compensate for messy state modeling?"

Asking that question destroys half the effects in a codebase before they are ever committed.

## What the interviewer wants to see

In React interviews, how you handle side-effects screams your exact seniority level:

- you fundamentally comprehend what an effect is actually designed for
- you can ruthlessly separate external synchronization from internal data derivation
- you obsess over predictability, cleanup duties, and avoiding chain-reaction renders

Engineers who articulate this build interfaces that feel rock-solid and don't suffer from mysterious timing bugs.

> A good effect bridges the gap between your component and the outside world. A bad effect just tries to patch holes in your state architecture.

> If there is no external system involved, you probably don't need an effect.
