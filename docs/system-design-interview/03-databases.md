# Databases

## SQL vs non-relational

### SQL / relational

Better when:

- integrity matters a lot
- relationships are central
- transactions are important
- ad hoc queries and joins are common

Benefits:

- strong consistency
- clear modeling
- good support for complex queries

Costs:

- more rigid schema
- scale-out can be harder in some scenarios

### Non-relational

Better when:

- the schema changes often
- access is document, key-value, or graph oriented
- horizontal scale and read simplicity matter more

Benefits:

- flexibility
- modeling that matches the access pattern
- good fit for certain distributed workloads

Costs:

- fewer native joins in many cases
- consistency and complex querying may be weaker
- higher risk of duplication and poor denormalization

## Good short answer

`I choose first based on the access pattern and the guarantees the domain needs. If the problem requires integrity, transactions, and strong relationships, SQL is usually the natural choice. If the domain needs flexible schema, document-oriented reads, or specific distributed scaling characteristics, non-relational can be a better fit.`

## Topics that often come up

### Normalization vs denormalization

- normalization reduces redundancy and improves consistency
- denormalization improves read performance in specific scenarios
- denormalizing too early increases maintenance cost

### Indexes

- speed up reads
- cost writes and storage
- the wrong index also has a cost

### Replication

Benefits:

- read scaling
- resilience

Costs:

- replica lag
- eventual consistency

### Sharding

Benefits:

- distributes load and data

Costs:

- operational complexity
- more expensive cross-shard queries
- difficult rebalancing

## Common questions

### When would I use Postgres instead of Mongo?

- when relationships and transactions matter
- when I need rich and predictable querying
- when consistency matters more than schema flexibility

### When does Mongo make sense?

- document-shaped aggregates by entity
- schema changes frequently
- reads are more document- or collection-oriented
