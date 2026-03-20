---
title: Reuse Without Overcomplicating
description: How to share logic and structure without turning the code into a fragile dependency web that is hard to understand.
summary: Good reuse saves future work. Bad reuse spreads coupling and makes every change more expensive.
guideId: reuse-without-extra-complexity
locale: en
status: active
pillarId: patterns-that-actually-matter
branchId: reuse-vs-complexity
pubDate: 2026-02-18
updatedDate: 2026-02-22
category: Patterns That Actually Matter
topic: Reuse Without Overcomplicating
path:
  - Patterns That Actually Matter
  - Reuse Without Overcomplicating
order: 10
relationships:
  - composition-vs-abstraction-without-theatre
  - avoiding-overengineering-without-regret
tags:
  - patterns
  - reuse
  - complexity
topicIds:
  - architecture-patterns
relatedDeckIds: []
---

## The problem

Code reuse always looks like an undisputed architectural victory at first glance.

If two separate features do something even slightly similar, the immediate temptation is to aggressively merge them so you can proudly say you "stayed DRY."

The fatal flaw is that rushing to reuse code doesn't magically eliminate the cost of development. It violently shifts the cost to the future, usually manifesting as brutal coupling and feature flags built to handle diverging requirements.

## Mental model

Excellent reuse doesn't mean blindly sharing any code that looks visually similar.

It means strictly sharing logic that *conceptually changes for the exact same business reasons*, and logically belongs in the exact same domain.

Before extracting a shared utility, aggressively ask yourself:

> "Am I explicitly removing actual domain duplication, or am I just gluing two temporarily identical features together?"

## Breaking it down

A ruthlessly pragmatic way to evaluate an extraction is this:

1. Verify if the two pieces of code genuinely share the exact same long-term business responsibility.
2. Check if they are virtually guaranteed to change for the exact same reasons in the future.
3. Measure the mental tax of forcing the next developer to reverse-engineer the generic, shared layer.
4. Only authorize the extraction when the shared code mathematically reduces duplicated maintenance without destroying local readability.

This filter prevents you from building a generic `utils.js` file that every feature depends on, but nobody actually understands.

## Simple example

Imagine building two email-sending flows.

Both flows construct a message, frantically call a third-party provider, and securely register a database log.

If both flows are just sending monthly marketing newsletters, sharing that logic is a phenomenal idea.

But if one sends a friendly onboarding welcome and the other dispatches a critical security alert, what looks like generic "email sending" is actually a dangerous illusion.

Joining them too early will violently hide their massively different requirements for priority delivery, retries, security auditing, and template logic.

## Common mistakes

- instantly extracting thousands of lines of code the exact second you spot two similar functions
- violently sharing logic that happens to look the same today, but will inevitably change for wildly different business reasons tomorrow
- building a "flexible" shared utility that requires 8 different optional configuration parameters just to work
- treating a tiny bit of honest code duplication as a bigger architectural sin than massive structural coupling

## How a senior thinks

A strong senior engineer deploys code reuse with deep suspicion, not by panicked reflex.

That calculation usually sounds like this:

> "If the mental tax of deciphering this huge shared layer starts costing more than just copy-pasting a 5-line function, then this abstraction is already a massive failure."

That exact question acts as a brutal shield against building a system that looks gorgeous on an architecture diagram but is agonizing to change.

## What the interviewer wants to see

In aggressive system design or technical interviews, this topic violently separates juniors from seniors:

- you articulately understand that extreme code reuse introduces massive coupling costs
- you evaluate architectural merging based on shared business volatility, not just visual code similarity
- you actively prioritize isolated readability over dogmatic DRY principles

Engineers who nail this look like battle-tested veterans who know exactly when to merge logic, and exactly when to copy-paste without a shred of guilt.

> Code reuse is absolutely not valuable simply because it exists. It is only valuable when it physically destroys future maintenance work without multiplying confusion.

> If every single feature tragically depends on the exact same shared layer, one tiny bug fix will burn down the entire application.
