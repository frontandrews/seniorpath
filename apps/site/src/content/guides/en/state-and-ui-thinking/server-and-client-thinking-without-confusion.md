---
title: What Runs on the Client and on the Server
description: How to decide where each part of the work should happen without turning the architecture into a confusing mix.
summary: When you do not separate client and server well, the UI becomes slower, more fragile, and harder to maintain.
guideId: server-and-client-thinking-without-confusion
locale: en
status: active
pillarId: state-and-ui-thinking
branchId: server-and-client-thinking
pubDate: 2026-03-01
updatedDate: 2026-03-03
category: State and UI
topic: Client and Server
path:
  - State and UI
  - What Runs on the Client and on the Server
order: 10
relationships:
  - effects-without-the-mess
tags:
  - react
  - server
  - client
topicIds:
  - react
relatedDeckIds: []
---

## The problem

Frontend architectures often collapse into chaos because the team mixes client and server responsibilities without any clear, defensible criteria.

Suddenly, there are network fetches happening deep inside nested buttons, sensitive business secrets leaking to the browser, and client components aggressively recalculating work that the server could have just sent ready.

The inevitable result is a slower, much more fragile, and exhausting codebase.

## Mental model

The client and the server aren't just different physical locations.

They have fundamentally different strengths and responsibilities.

Simply put:

- The server exists to furiously fetch data, validate hard rules, protect secrets, and assemble the heavy truth.
- The client exists to handle immediate user interaction, manage localized state, capture clicks, and deliver snappy UI feedback.

When that division of labor is respected, architecture decisions practically make themselves.

## Breaking it down

Before deciding where a piece of logic runs, ruthlessly answer:

1. Does this logic require an API secret, a direct database connection, or strict permission checks?
2. Does this logic directly depend on a user's click, typing, or immediate visual feedback?
3. Could this heavy data transformation just happen on the backend so the browser does zero work?
4. Does this business rule actually need to be exposed in the client's JavaScript bundle?

These questions stop you from recklessly mixing environments.

## Simple example

Imagine a complex dashboard page that shows recent orders and lets the user quickly filter them by status.

A clean, senior split looks like this:

- The server securely fetches all recent orders from the database, formats the dates, and sends down a clean initial payload.
- The client component receives that list, holds the `selectedFilter` state, and instantly updates the screen when the user interacts.

The disastrous mistake is forcing the client to do all the heavy lifting: fetching raw rows, formatting messy dates, and applying complex business logic just because "we were already writing code in React."

That lazily increases the browser's CPU cost and completely blurs the boundary of who owns what.

## Common mistakes

- forcing the client's browser to do data transformations that the server could have resolved instantly
- casually putting API keys or sensitive domain logic perilously close to the user's interface
- treating a highly interactive React app as an excuse to make the client do absolutely everything
- deciding where code lives based on the convenience of the file you currently have open, rather than architectural responsibility

## How a senior thinks

A strong senior engineer doesn't start by asking "which file should I put this function in?"

They ask:

> "Which side of the network should permanently own this responsibility so the interface stays as dumb, fast, and secure as possible?"

That single question violently improves performance, security, and maintainability all at once.

## What the interviewer wants to see

In frontend system design interviews, articulating this shows immediate maturity:

- you deeply understand that the client and server act as a team with totally different roles
- you can aggressively justify why a block of logic belongs on one side and not the other
- you prioritize user security, network simplicity, and minimizing browser rendering costs

Candidates who do this well look like architects who design interfaces, not just developers who write components.

> The client exists to interact. The server exists to prepare and protect the truth.

> If everything ended up on the client purely for convenience, your architecture lost its discipline months ago.
