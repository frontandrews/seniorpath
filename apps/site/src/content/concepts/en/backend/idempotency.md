---
title: Idempotency
description: What idempotency means in APIs and jobs, and why repeating the same request should not repeat the same effect.
summary: Idempotency is the property of repeating the same operation without continuing to create new effects after the first useful result.
conceptId: idempotency
domainId: backend
groupId: apis
locale: en
status: active
pubDate: 2026-03-19
tags:
  - api
  - backend
  - reliability
relatedGuideIds:
  - api-and-service-design-with-clear-boundaries
  - failure-and-recovery-scenarios-with-clarity
---

## What it is

Idempotency means that you can repeat the same operation multiple times, but the core effect only happens once.

This saves your system when a client double-clicks a submit button, a worker restarts mid-job, or an external API resends a webhook because it thought the first one failed.

## When it matters

It matters in payments, webhooks, asynchronous jobs, and any flow where retrying is a normal part of production life.

Without idempotency, a simple retry could create duplicate charges, send the same email twice, or silently corrupt your database state.

## Common mistake

The common mistake is treating every incoming request as a brand new intention.

This works perfectly until the first network timeout. Since the client wasn't sure if the previous attempt succeeded, it tries again. If the backend doesn't recognize the second request as the exact same intent, it duplicates the work.

## Short example

When a client sends a `POST /orders`, they include an idempotency key (like a unique UUID for that checkout attempt).

If the connection drops and the client sends the exact same request again, the backend sees the duplicate key. It recognizes the order was already processed during the first attempt and simply returns the success response again, safely ignoring the duplicate attempt.

## Why it helps

Idempotency makes failure handling much calmer in distributed systems.

When you know you can safely repeat operations, retrying a failed request stops feeling like a dangerous guess and becomes a reliable, planned behavior.
