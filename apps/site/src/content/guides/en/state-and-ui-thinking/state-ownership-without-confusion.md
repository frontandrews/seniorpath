---
title: Who Owns This State?
description: A simple way to decide what should be state, what can be derived, and what should not exist at all.
summary: A large part of UI bugs begins when you store too much state or store it in the wrong place.
guideId: state-ownership-without-confusion
locale: en
status: active
pillarId: state-and-ui-thinking
branchId: state-ownership
pubDate: 2026-03-05
updatedDate: 2026-03-09
category: State and UI
topic: State
path:
  - State and UI
  - Who Owns This State?
order: 10
relationships:
  - server-and-client-thinking-without-confusion
  - effects-without-the-mess
tags:
  - react
  - state
  - ui
topicIds:
  - react
relatedDeckIds:
  - react-rendering-core
---

## The problem

Many front-end interfaces become disastrously confusing because teams start storing state everywhere before validating whether that value even needs to exist.

Soon, the exact same data appears in three different places, one screen silently depends on another to stay coherent, and users start reporting "random" bugs.

Most of the time, the problem isn't React or Vue. The problem is a chaotic lack of state ownership.

## Mental model

Good state is state with a brutally clear owner.

If a UI value can be mathematically calculated from something else, it probably shouldn't be stored in memory twice.

If two entirely different parts of the screen depend on the exact same value, someone explicit needs to be declared the single source of truth.

## Breaking it down

Whenever you look at a value in the UI, force yourself to answer:

1. Does this actually change over time due to user interaction or network requests?
2. Could I easily calculate this on the fly from props or existing state?
3. Who is the absolute, unquestionable source of truth for this value?
4. Does this value really need to be shared globally, or can it be fiercely protected locally?

Asking these questions aggressively prevents the creation of invented, unnecessary state.

## Simple example

Imagine a page with a user list and a search field.

A messy, junior approach stores three things:

- `users`
- `searchQuery`
- `filteredUsers`

The fatal flaw is that `filteredUsers` is essentially a lie—it's just a derived computation of `users` combined with `searchQuery`.

A senior, durable approach stores only two things:

- `users`
- `searchQuery`

And simply calculates the filtered list as a normal variable during the render cycle.

By doing that, you instantly eliminate the need for manual synchronization and drastically lower the chance of showing stale data to the user.

## Common mistakes

- storing state that could trivially be derived during render
- creating two conflicting sources of truth for the exact same conceptual value
- lifting state up to global stores or parent components way too early
- spreading shared state across the app without defining a clear owner

## How a senior thinks

A strong senior front-end engineer doesn't immediately ask "where do I put this \`useState\`?"

They ask:

> "Does this value actually need to exist as state at all, or can I just derive it from the truth I already have?"

Answering that question usually simplifies the component heavily before you even write the first line of code.

## What the interviewer wants to see

In front-end architecture interviews, this mindset reveals massive operational maturity:

- you aggressively differentiate core truth from derived values
- you deeply respect the concept of a "single source of truth"
- you can articulately justify why a piece of state must be local or global

Engineers who do this well project the image of someone who builds UI with fewer silent bugs and vastly less maintenance friction.

> Storing too much state looks like helpful flexibility on day one, and becomes a synchronization nightmare on day ten.

> If you don't know exactly who owns the value, your state is not modeled well yet.
