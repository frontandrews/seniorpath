---
title: Cache Invalidation
description: Why cache becomes dangerous when data changes, and why speed without an update strategy usually generates stale information.
summary: Cache invalidation is the process of deciding when cached data stopped being safe to serve and needs to be updated or removed.
conceptId: cache-invalidation
domainId: data
groupId: cache
locale: en
status: active
pubDate: 2026-03-19
tags:
  - cache
  - data
  - consistency
relatedGuideIds:
  - cache-and-consistency-without-self-deception
---

## What it is

Cache invalidation is how your system realizes that its fast, cached data has become too old to be trusted anymore.

Adding a cache is easy. The hard part is keeping that cache from lying to your users when the real data changes.

## When it matters

This matters the moment an original record changes in the database, but a query, page, or object still lives in the cache.

If you don't handle invalidation, your system becomes incredibly fast—at serving the wrong information.

## Common mistake

The most common mistake is assuming that a simple TTL (Time-To-Live) solves every cache problem.

TTL is fine for data that doesn't matter much. But for critical data, you need proactive invalidation tied directly to your write paths or domain events, so the cache drops the old data the millisecond it becomes invalid.

## Short example

If a product's price suddenly drops in your primary database, a cached product page might still show the expensive price to customers until the cache naturally expires.

If showing the wrong price for five minutes is unacceptable for the business, your update logic must immediately invalidate or overwrite that cache entry before returning success.

## Why it helps

Thinking about cache invalidation forces you to stop looking at speed in isolation and start looking at speed and correctness together.

That is usually the exact moment when a developer's caching strategy stops being naive and starts getting mature.
