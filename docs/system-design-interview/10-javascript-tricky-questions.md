# JavaScript Tricky Questions

## Event loop: microtasks vs macrotasks

Short answer:

`Microtasks run before the next macrotask. Promise callbacks go to the microtask queue, while setTimeout goes to the macrotask queue. That is why Promise callbacks often run before a zero-delay timeout.`

## Is JavaScript pass-by-reference?

Better answer:

`JavaScript is pass-by-value. For objects, the value being copied is the reference itself. That is why mutating an object through one variable is visible through another, while reassigning the variable is not.`

## this keyword

What matters:

- `this` depends on call site, not where the function was defined
- arrow functions capture lexical `this`
- method extraction often changes `this`

## == vs ===

Short answer:

`I default to === because it avoids implicit coercion. If I use ==, it needs to be intentional and based on clear coercion rules, not convenience.`

## Closures

Good explanation:

`A closure is a function keeping access to variables from its lexical scope even after the outer function has finished. This is powerful, but it is also behind bugs like stale values in callbacks.`

## var vs let vs const

Senior angle:

- `var` is function-scoped and hoisted in a way that causes bugs
- `let` and `const` are block-scoped
- `const` prevents reassignment, not mutation of nested object contents

## Deep copy questions

Good angle:

- spread is shallow
- structuredClone handles many cases but not every special type or behavior
- cloning strategy should match the data and the use case

## Common traps

- assuming async means parallel
- misunderstanding closures in loops
- confusing mutation with reassignment
- not knowing Promise.all failure behavior

## Good closing line

`The tricky part of JavaScript is usually not syntax. It is understanding execution order, references, closures, and coercion well enough to predict behavior under pressure.`
