---
title: Derived State
description: What derived state is, when it helps, and why copying values into state usually creates bugs.
summary: Derived state is data you can calculate from existing props or state without storing an extra copy.
conceptId: derived-state
domainId: react
groupId: state
locale: en
status: active
pubDate: 2026-03-19
tags:
  - react
  - state
  - ui
relatedGuideIds:
  - state-ownership-without-confusion
---

## What it is

Derived state is any value you can calculate on the fly during render, just by looking at existing variables (like props or other state).

If you already have a list of `items` and a search `query`, the filtered `visibleItems` list is derived state. You don't need to put it inside a new `useState`; you just calculate it.

## When it matters

This matters deeply when a component starts copying props into its own state, or when it tries to maintain two synchronized sources of truth at the same time.

That is exactly how most silent UI rendering bugs are born.

## Common mistake

The most common mistake is creating a `useEffect` to update a second piece of state whenever the original data changes, just because it feels "safer" or optimized.

By doing that, you create a manual synchronization problem. Now your component has two values that mean the same thing but can easily drift out of sync during the render cycle.

## Short example

If a screen holds `items` and `query` in state, adding a third `useState` for `visibleItems` (and a `useEffect` meant to update it) is usually a trap.

Instead, `visibleItems` should just be a block-scoped variable calculated directly in the component body (or memoized with `useMemo` if it's expensive).

## Why it helps

The fewer places in your code that try to own the same truth, the more predictable the component becomes.

This eliminates the risk of showing stale UI and prevents the framework from running unnecessary extra renders.
