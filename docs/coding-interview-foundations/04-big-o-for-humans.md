# Big-O for Humans

## Why Big-O matters

It is not about sounding smart.
It is about noticing when a solution repeats too much work.

## Easy mental model

- `O(1)` -> same amount of work
- `O(n)` -> work grows with the input
- `O(n^2)` -> work grows much faster because you scan inside a scan
- `O(log n)` -> you throw away a big chunk each step

## Practical examples

### O(n)

- scan an array once

### O(n^2)

- compare every element with every other element

### O(log n)

- binary search in sorted data

## What interviewers often want

Not a perfect theorem.
They want to know whether you see:

- repeated scans
- nested loops
- extra memory use
- search-space reduction

## Rule of thumb

If you can explain why work is repeated or avoided, your complexity explanation will usually be good enough.
