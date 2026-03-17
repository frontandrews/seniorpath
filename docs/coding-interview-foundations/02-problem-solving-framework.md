# Problem-Solving Framework

## Use this every time

1. What is the input?
2. What is the output?
3. Is the problem asking about order, counting, lookup, or a contiguous range?
4. What is the slow obvious solution?
5. What repeated work can I avoid?

## Translation layer

Common hidden meanings:

- `find duplicates` -> set or hashmap
- `count occurrences` -> frequency map
- `longest substring / subarray` -> sliding window
- `sorted array` -> maybe two pointers or binary search
- `most recent unresolved item` -> stack

## Good habit

Before writing code, say this out loud:

`The brute-force version repeats work here. I think the pattern that removes that repeated work is X.`

## What usually blocks people

- jumping into code too fast
- not identifying the pattern clue
- not understanding why the faster solution is faster
- trying to memorize finished code instead of the reasoning
