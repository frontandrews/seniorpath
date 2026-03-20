---
title: Two Sum without memorizing the trick
description: How to solve a classic interview problem while explaining the path, the trade-off, and the final choice.
summary: A arrays and hash map challenge to practice problem reading, complement thinking, and solution explanation.
challengeId: two-sum
locale: en
status: active
type: arrays-hash-map
typeLabel: Arrays and Hash Map
level: beginner
estimatedMinutes: 15
solutionLanguage: typescript
order: 10
pubDate: 2026-03-20
tags:
  - interviews
  - arrays
  - hash map
relatedGuideIds:
  - thinking-before-you-code-in-interviews
  - recognizing-patterns-without-memorizing-tricks
  - explaining-your-solution-without-losing-the-thread
relatedChallengeIds: []
whatToNotice:
  - The question wants a fast decision for each number while you walk through the list.
  - The core idea is not adding everything. It is identifying which complement is missing.
  - If you remember what you have already seen, one pass is enough.
commonMistakes:
  - sorting too early and forgetting that the original indexes matter
  - jumping to two nested loops without saying why the naive version costs O(n²)
  - storing the current number before checking the complement and reusing the same index
complexity:
  time: O(n)
  space: O(n)
---

## The problem

Given an array of integers `nums` and an integer `target`, return the **indexes** of two numbers whose sum equals `target`.

You can assume there is exactly one valid answer, and you cannot use the same element twice.

## Quick example

```txt
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
```

## How to think before you code

The first correct version compares each number against all later numbers.

It proves understanding, but it costs `O(n²)`.

The next question is:

> While I am looking at the current number, what do I wish I knew immediately?

The answer is: I want to know whether its **complement** has already appeared.

If the target is `9` and the current number is `7`, I need to know whether I have already seen `2`.

That turns the problem into:

1. walk through the array once
2. compute the complement `target - current`
3. check whether that complement is already stored
4. if yes, you found the answer
5. if not, store the current number with its index

## Step-by-step solution

1. Create a `Map<number, number>` to store `number -> index`.
2. For each position `index`, read `value`.
3. Compute `complement = target - value`.
4. If `seen.has(complement)`, return `[seen.get(complement), index]`.
5. Otherwise store `seen.set(value, index)`.

The important detail is the order:

- first check whether the complement already exists
- then store the current value

That prevents reusing the same element.

## TypeScript solution

```ts
export function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>()

  for (let index = 0; index < nums.length; index += 1) {
    const value = nums[index]
    const complement = target - value

    if (seen.has(complement)) {
      return [seen.get(complement)!, index]
    }

    seen.set(value, index)
  }

  return null
}
```

## What to say in the interview

A good short explanation would be:

> The simplest version compares every pair and costs O(n²). Since I only need to know whether the complement has already appeared, I can use a hash map for average O(1) lookup and solve it in one pass.

That shows three strong signals:

- you understood the naive version
- you justified the optimization
- you connected the data structure to the actual need of the problem

## When this pattern shows up again

The same idea comes back whenever the problem asks you to:

- remember what has already appeared
- detect repetition
- answer whether a complement exists
- group or query quickly during iteration

That is why this challenge is not only about `Two Sum`.

It is about recognizing when fast-access memory simplifies the decision.

> The point is not memorizing hash map.

> The real signal is noticing that the problem asks for memory during the pass.
