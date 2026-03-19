---
title: O(n²)
description: What O(n²) means, why nested loops often end up there, and when it actually matters.
summary: O(n²) usually appears when work grows with every pair comparison or repeated full scan.
termId: o-n-squared
locale: en
status: active
aliases:
  - quadratic-time
tags:
  - coding-interview
  - javascript
pubDate: 2026-03-18
---

## What it means

`O(n²)` means the amount of work grows roughly with the square of the input size.

If the input doubles, the work can become about four times bigger.

That is why small examples may feel fine, but larger inputs suddenly become slow.

## A common shape

The classic case is a loop inside another loop where each item is compared with many other items.

```ts
for (let i = 0; i < items.length; i += 1) {
  for (let j = 0; j < items.length; j += 1) {
    compare(items[i], items[j])
  }
}
```

That is not the only way to get `O(n²)`, but it is the most common shape people should recognize quickly.

## When it matters

`O(n²)` is not automatically wrong.

It becomes a problem when:

- `n` can grow a lot
- the operation inside the loop is expensive
- the code runs often enough to affect user experience or infrastructure cost

If `n` is tiny and fixed, a quadratic approach may still be acceptable.

## Better question to ask

Do not ask only "is this O(n²)?"

Ask:

1. how large can `n` actually get?
2. how often does this run?
3. can a hash map, set, sort, or preprocessing step reduce repeated scanning?

That framing is usually more useful than complexity theatre by itself.
