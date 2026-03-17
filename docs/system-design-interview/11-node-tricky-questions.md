# Node Tricky Questions

## Is Node single-threaded?

Better answer:

`The JavaScript execution model is centered around a single-threaded event loop, but Node is not limited to one thread overall. It uses libuv and can offload work to thread pools or workers depending on the task.`

## When is Node a bad fit?

Short answer:

`Node is a weaker fit for heavy CPU-bound workloads if they stay on the main thread. If the workload is dominated by intense computation, worker threads, native modules, or another runtime may be a better choice.`

## Worker threads vs cluster

Short answer:

`Worker threads help with CPU-bound work inside one process. Cluster is about running multiple Node processes, usually to use multiple cores and isolate failures more cleanly.`

## Streams and backpressure

What matters:

- streams avoid loading everything into memory at once
- backpressure prevents producers from overwhelming consumers
- this matters for large files, network responses, and memory-sensitive workloads

## Why can Node APIs become slow under load?

Points:

- blocking work in the event loop
- too many synchronous operations
- poor connection pooling
- slow downstream dependencies
- no backpressure or queue control

## Common traps

- thinking async automatically means scalable
- blocking the event loop with CPU-heavy work
- not handling connection lifecycle well
- treating Node memory leaks as purely framework problems

## Good closing line

`Node is excellent when the workload is I/O-heavy and concurrency matters, but you still need to understand where the event loop can be blocked and when to move work out of it.`
