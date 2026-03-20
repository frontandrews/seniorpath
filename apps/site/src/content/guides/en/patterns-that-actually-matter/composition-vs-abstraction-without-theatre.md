---
title: Composition or Abstraction?
description: How to choose between joining simple pieces or creating a generic layer without turning flexibility into a mess.
summary: Not every repetition asks for abstraction. Sometimes simple composition leaves the system clearer and easier to change.
guideId: composition-vs-abstraction-without-theatre
locale: en
status: active
pillarId: patterns-that-actually-matter
branchId: composition-vs-abstraction
pubDate: 2026-01-21
updatedDate: 2026-01-25
category: Patterns That Actually Matter
topic: Composition or Abstraction
path:
  - Patterns That Actually Matter
  - Composition or Abstraction?
order: 10
relationships:
  - reuse-without-extra-complexity
tags:
  - patterns
  - architecture
  - abstraction
topicIds:
  - architecture-patterns
relatedDeckIds: []
---

## The problem

Most bad abstractions in a codebase were born far too early.

An engineer spots two slightly similar blocks of code, aggressively creates a massive generic layer to "stay DRY," and very quickly the code looks ten times smarter than it is clear.

At first, the abstraction feels brilliantly elegant. Three months later, a simple feature request requires reverse-engineering an internal API that absolutely nobody asked for.

## Mental model

A fantastic abstraction violently reduces your mental load.

A disastrous abstraction just lazily hides critical business variations behind a shiny, undocumented interface.

Before you ever hit "extract component", it is mandatory to ask yourself:

> "Am I actually making this code drastically easier to read, or am I just hiding variation before the pattern has even matured?"

More often than not, simply composing small, dumb pieces solves the problem infinitely better than a massive generic wrapper.

## Breaking it down

A highly pragmatic, senior way to make this decision is this:

1. Verify if the duplicated parts conceptually *must* change together for the business to survive.
2. Confirm if the current slightly-duplicated variation is actually readable enough as is.
3. Test if simply composing the UI (building blocks) is cleaner than parameterizing it (passing 15 props).
4. Only authorize the abstraction when the new layer mathematically destroys massive duplication and eliminates doubt.

This mindset physically prevents you from inventing a complex internal framework for a problem you don't even fully understand yet.

## Simple example

Imagine building three different UI cards that share a border, but have entirely different titles, buttons, and visual blocks.

A rushed, junior reflex is to build a massive `<SuperCard />` component demanding 12 different optional boolean props to cover every bizarre edge case.

A senior, hardened response ignores the urge to abstract:

- build a dead-simple `<CardContainer>` for the border
- compose the unique titles and buttons directly as `children` inside the specific pages
- leave the exact variations blindingly explicit directly where the difference matters

By leveraging simple composition, you preserve extreme clarity without forcing the entire team to memorize a premature, fragile abstraction.

## Common mistakes

- panic-abstracting the exact second you type the same line of code twice
- treating literally any form of repetition as a career-ending architectural defect
- dangerously hiding two completely different business rules behind the exact same generic function name
- creating a "God Component" that accepts infinitely scalable props but explains absolutely nothing about its intent

## How a senior thinks

A strong senior engineer does not aggressively abstract just to prove they just read a book on design patterns.

They abstract strictly to reduce the agonizing friction of future changes.

That mindset usually sounds like this:

> "If introducing this new layer doesn't make the business intent painfully obvious and future features significantly cheaper to build, then I am not merging this abstraction today."

Rigorously asking that question prevents an unbelievable amount of free, unforced architectural complexity.

## What the interviewer wants to see

In architectural or senior frontend interviews, this topic reveals your true mileage instantly:

- you can articulately distinguish between "acceptable, honest repetition" and "dangerous, buggy duplication"
- you deeply understand exactly when dumb composition defeats generalized abstraction
- you prioritize the next developer's reading comprehension over your own desire to write "perfectly DRY" code

Engineers who nail this question look like veterans who use patterns as surgical tools, not as decorative trophies.

> Not every duplicated line of code is screaming for an abstraction. Some code just requires the patience to let the real problem fully reveal itself.

> If your new layered abstraction requires more documentation to explain than the old duplicated code did, you completely failed the refactor.
