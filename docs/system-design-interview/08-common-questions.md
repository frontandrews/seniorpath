# Common Questions

## Performance

### How do you investigate a slow system?

`I separate CPU, I/O, network, and database concerns first. Then I use metrics and traces to find the real bottleneck. Only after that do I decide between cache, indexes, parallelism, precomputation, or architectural changes.`

## Concurrency

### Is single thread always worse than multithread?

`No. For I/O-bound workloads, a single-threaded event-loop model can be simple and highly efficient. Multithreading fits better when the problem is CPU-bound and needs real parallelism.`

## Databases

### SQL or NoSQL?

`I choose based on domain guarantees and access patterns. If the problem needs integrity, transactions, and strong relationships, SQL usually wins. If the schema changes often and access is document-centered, NoSQL can be a better fit.`

## State

### When do you use a global store?

`When multiple parts of the application need to read and mutate the same state with clear synchronization rules. If the state is local or temporary, I prefer to keep it near the UI.`

## React

### What is the Virtual DOM and why does it matter?

`It is the in-memory representation of the desired UI. It helps React reconcile changes efficiently, but real performance still depends on good state modeling and avoiding unnecessary expensive work.`

## Next

### When do you use SSR instead of SSG?

`When the HTML must be generated with per-request data, usually because of personalization, auth, or strong freshness requirements. If the content is more stable and SEO matters, SSG is usually simpler and cheaper.`

## AI systems

### What is the difference between MCP and RAG?

`MCP is a protocol for integrating tools and external systems. RAG is a technique for retrieving relevant context before generating an answer. They solve different problems and can work together.`
