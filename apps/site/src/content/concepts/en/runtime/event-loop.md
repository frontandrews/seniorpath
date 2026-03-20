---
title: Event Loop
description: What the event loop coordinates and why asynchronous JavaScript often runs in an order that surprises people.
summary: The event loop is the mechanism that decides when queued work gets its turn after the current stack finishes.
conceptId: event-loop
domainId: javascript
groupId: runtime
locale: en
status: active
pubDate: 2026-03-19
tags:
  - javascript
  - async
  - runtime
relatedGuideIds:
  - javascript-event-loop
---

## What it is

The event loop is the traffic controller in JavaScript that decides when queued asynchronous work finally gets its turn to run, but only after the current synchronous code finishes executing.

It is the exact reason why promises, timers, and callbacks don't just magically run the moment you write them in your code.

## When it matters

It matters the moment you start debugging weird execution orders, race conditions, or when you face those classic JavaScript interview questions asking for the exact output of five nested `setTimeout`s and `Promise`s.

Without a clear mental model of the call stack, the callback queue, and the event loop's scheduling logic, JavaScript's behavior will just look like chaotic magic.

## Common mistake

A very common mistake is memorizing the phrase "async code runs later" without deeply understanding what that "later" actually means in the engine.

"Later" does not mean "in a background parallel thread." It simply means "it will wait patiently in a queue until the main thread is completely empty."

## Short example

If you write a `console.log('A')`, schedule a `.then()` from a resolved Promise, and immediately write `console.log('B')`, the synchronous code finishes first. You will always see `A`, then `B`.

Only after the main stack is entirely clear does the event loop look at the microtask queue and say, "Okay, now we can run the Promise callback."

## Why it helps

When you stop looking at syntax and start visualizing the actual execution order mechanism, confusing async bugs suddenly become painfully obvious to explain.

That is the real power of understanding the event loop: you move from guessing what the code will do, to knowing exactly how the engine will run it.
