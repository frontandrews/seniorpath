# Performance

## How to think about it

Performance questions usually fall into 3 groups:

- latency
- throughput
- resource usage

## Main question

### What do you look at first when dealing with performance?

Short answer:

`I try to locate the bottleneck first. It can be rendering, network, database, locking, serialization, or I/O. Without measurement, optimization becomes guesswork.`

## Mental checklist

- CPU-bound or I/O-bound
- bottleneck on client, server, or database
- p95 / p99 or whether the average is hiding the problem
- cold start, cache miss, or heavy serialization
- code issue, architecture issue, or capacity issue

## Common tradeoffs

### Cache

Benefits:

- lower latency
- lower backend load

Costs:

- invalidation
- stale-data risk
- higher operational complexity

### Precomputation

Benefits:

- faster responses
- less work per request

Costs:

- more complex pipeline
- risk of outdated data

### Parallelism

Benefits:

- better resource usage
- less total time for independent tasks

Costs:

- synchronization
- resource contention
- harder debugging

## Common interview prompts

### How would you improve a slow endpoint?

- measure where time is spent
- review query shape and indexes
- reduce overfetching
- use cache when the data allows it
- parallelize independent dependencies

### How would you improve a slow frontend?

- measure render and network cost
- reduce bundle size and unnecessary hydration
- improve component and state boundaries
- use streaming, caching, and lazy loading when appropriate
