# Concurrency, Single Thread, and Multithread

## Single thread vs multithread

### Single thread

Benefits:

- simpler mental model
- fewer race-condition problems
- more predictable debugging

Costs:

- heavy CPU work blocks everything
- worse use of multiple cores

### Multithread

Benefits:

- better real parallelism for CPU-bound work
- better use of multiple cores

Costs:

- synchronization
- deadlock
- race conditions
- harder debugging

## Important interview point

`single-threaded` does not mean `not concurrent`.

Example:

- Node.js can be single-threaded at the event-loop level and still handle many concurrent operations through async I/O

## When to use each one

### Single thread / event loop

Better when:

- the workload is I/O-bound
- simplicity matters a lot
- I/O latency dominates the flow

### Multithread

Better when:

- the workload is CPU-bound
- there is heavy compression, transformation, image, video, ML, or compute work

## Difference between concurrency and parallelism

- concurrency: multiple tasks make progress at the same time in the logical flow
- parallelism: multiple tasks are literally executing at the same time on different hardware resources

## Common questions

### When does a single-threaded event-loop model become a problem?

- when CPU-bound work blocks the loop
- when the event queue grows too much
- when one slow request degrades many others

### How do you mitigate it?

- move heavy CPU work to workers
- break the work into smaller units
- use queues
- scale horizontally with more instances

## Good short answer

`If the workload is mostly I/O, I prefer a simpler event-loop model. If the problem is CPU-bound and needs real multi-core parallelism, multithreading or workers make more sense.`
