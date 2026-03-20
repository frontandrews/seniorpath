---
title: Safer Inputs and APIs
description: How to treat external input with less naivety and design APIs that do not accept too much data for convenience.
summary: A secure API is not the one that trusts a nice-looking payload. It is the one that validates, restricts, and reduces the error surface.
guideId: safer-input-and-api-design
locale: en
status: active
pillarId: security-thinking
branchId: input-and-api-safety
pubDate: 2026-02-20
updatedDate: 2026-02-25
category: Security in Practice
topic: Safer Inputs and APIs
path:
  - Security in Practice
  - Safer Inputs and APIs
order: 10
relationships:
  - auth-and-authorization-without-mixing-them-up
tags:
  - security
  - api
  - validation
topicIds:
  - security
relatedDeckIds: []
---

## The problem

A terrifying number of APIs become hopelessly vulnerable not because authentication is missing, but because they casually accept massive amounts of external input without any criteria.

Extra JSON fields slide through, malformed strings get processed, unexpected database IDs are parsed, and the architecture desperately tries to safely handle all of that garbage later in the service layer.

That "later" is exactly when a junior hacker drops a table.

## Mental model

External client input must mathematically never enter the backend architecture as ready-made truth.

It must explicitly be forced through a brutal set of interrogations at the absolute edge of the system:

- is this exact data format explicitly mathematically valid?
- does this specific field even legally exist in our contract?
- does this exact value make logical sense in this exact request context?
- does this authenticated user realistically have permission to submit this exact data?

Security here isn't about deploying expensive firewalls. It is entirely about militant structural discipline exactly at the network boundary.

## Breaking it down

A deeply rigorous, senior protocol for locking down an API is this:

1. violently validate the exact schema format the millisecond the request touches the routing layer
2. aggressively strip away and discard any JSON fields that the exact flow does not explicitly require
3. mathematically normalize every string, date, and email before the business logic ever sees it
4. ruthlessly reject the request with a `400 Bad Request` the instant anything looks even slightly anomalous

This discipline brutally reduces the surface area for abuse, malicious fuzzing, and unexpected database state.

## Simple example

Imagine writing a standard user profile update endpoint.

If the API controller carelessly accepts a raw JSON body and executes a blind database merge, any unexpected field mathematically corrupts the model:

- `role: "admin"`
- `billingStatus: "paid"`
- `internalConfig: {}`

An unapologetic, senior architecture explicitly enforces the absolute minimum contract:

- `name`
- `bio`
- `avatarUrl`

Any other field is violently silently dropped, or the request errors out immediately.

The gain here is absolutely not just clean code. The gain is absolute, undeniable control over what your application is legally allowed to mutate.

## Common mistakes

- catastrophically trusting the frontend React client to "do the right thing" and send the correct payload
- lazily validating that a field is a "string", but completely failing to validate the actual business rules of that string
- leaving massive generic REST endpoints open "just in case we need the flexibility later"
- accepting 50 extra JSON fields and silently passing them around the codebase "because we just ignore them anyway"

## How a senior thinks

A strong senior engineer treats every single external payload as a hostile vector until proven otherwise.

That operational paranoia sounds exactly like this:

> "I demand we validate the schema instantly at the edge and accept the absolute smallest possible contract. Every single extra field we accept exponentially increases the mathematical surface area this engineering team has to defend."

That specific posture fundamentally eradicates mass-assignment vulnerabilities before they even compile.

## What the interviewer wants to see

In grueling backend security interviews, this instantly proves your architectural depth:

- you fundamentally understand that external input must be aggressively interrogated at the boundary, not deep in the service layer
- you explicitly design systems using strict, minimal contracts, completely rejecting "open payloads"
- you structurally connect security directly to basic API design, rather than just relying on authentication middleware

Engineers who operate like this are trusted to build core banking systems, because they aggressively neutralize risk before it enters the building.

> A truly secure API absolutely does not lazily accept everything and try to survive it. It aggressively accepts almost nothing, and does so deliberately.

> If an "almost correct" malicious payload can successfully penetrate your routing layer, your security boundary is mathematically too weak.
