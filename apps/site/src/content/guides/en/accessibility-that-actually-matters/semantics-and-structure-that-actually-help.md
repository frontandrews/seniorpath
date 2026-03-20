---
title: Semantics and Structure
description: How to use HTML and interface organization to help navigation, reading, and understanding without treating accessibility as a visual detail.
summary: Accessibility starts when the interface structure already makes sense even before CSS.
guideId: semantics-and-structure-that-actually-help
locale: en
status: active
pillarId: accessibility-that-actually-matters
branchId: semantics-and-structure
pubDate: 2026-02-27
updatedDate: 2026-03-04
category: Accessibility That Actually Matters
topic: Semantics and Structure
path:
  - Accessibility That Actually Matters
  - Semantics and Structure
order: 10
relationships:
  - keyboard-and-focus-without-frustration
tags:
  - accessibility
  - semantics
  - frontend
topicIds:
  - accessibility
relatedDeckIds: []
---

## The problem

The vast majority of web interfaces look visually stunning, but instantly disintegrate when you mathematically inspect the underlying markup.

You find a `<div>` poorly dressed up as an interactive button, `<h1>` heading levels aggressively placed entirely out of order purely for styling, and massive sections of the page that mean absolutely nothing to assistive technology.

On a screen, the design feels cohesive. But for users who navigate structural trees, the entire experience violently shatters.

## Mental model

Master-class HTML semantics are absolutely not pedantic technical decorations.

They form the undeniable skeletal structure that physically communicates the interface's actual intent before CSS even loads.

Before writing a single line of styling, a hardened engineer demands:

> "If I violently strip all CSS away from this page, does the raw HTML still explicitly explain the exact narrative and hierarchy of the interface?"

If the answer is no, your architectural foundation is fundamentally broken.

## Breaking it down

A deeply rigorous, senior protocol to enforce structural clarity is this:

1. Always aggressively enforce deploying the exact native HTML tag that technically represents the action.
2. Militantly demand sequential heading hierarchy (`H1 -> H2 -> H3`) strictly for document outline, never just for visual font sizes.
3. Deliberately wrap major page areas in explicit structural landmarks (`<main>`, `<nav>`, `<aside>`).
4. Absolutely refuse to slap interactive ARIA roles onto neutral `<div>` tags when a native element already exists.

This immediately solves massive accessibility failures before interaction logic even begins.

## Simple example

Imagine building a complex, clickable product card.

A lazy, destructive implementation looks like this:

```html
<div onclick="openDetails()">
  View details
</div>
```

Visually, the CSS mimics a button perfectly. Structurally, it is completely invisible as an interactive element. Assistive technology has absolutely no idea it can be clicked.

An unapologetic, senior structure immediately demands:

```html
<button type="button" onclick="openDetails()">
  View details
</button>
```

The massive upgrade here isn't just about "respecting HTML rules." It mathematically guarantees the interface is correctly mapped in the browser's accessibility tree, making it instantly operable by everyone.

## Common mistakes

- violently overusing the `<div>` tag for absolutely every element in the DOM out of sheer laziness
- aggressively skipping heading levels just to grab a smaller font size from the design system
- relying entirely on CSS visual layout to imply meaning, completely abandoning the structural markup
- arrogantly treating accessibility as a cosmetic QA check that happens exactly one day before launch

## How a senior thinks

A strong senior engineer fundamentally treats HTML semantics as the aggressive first layer of UI architecture.

That standard sounds exactly like this:

> "Before we write a single line of CSS or React state, I demand the raw DOM structure mathematically proves exactly what is a title, what is a primary action, and what is the main content."

That uncompromising posture simultaneously guarantees ironclad accessibility and massive long-term maintainability.

## What the interviewer wants to see

In rigorous frontend architectural interviews, this proves massive operational maturity:

- you treat the DOM as a meaningful semantic tree, not just an empty canvas for CSS
- you explicitly base your component choices entirely on their functional role, not their default browser styling
- you architect the entire accessibility experience starting directly from the core structure

Engineers who drive UI this way look like battle-tested system designers building for reality, rather than junior devs building fragile screenshots.

> Accessibility aggressively starts in the structural foundation, absolutely never in the final visual touches.

> If your entire application degrades into just thousands of `<div>` tags, your UI might look incredible, but it communicates absolutely nothing.
