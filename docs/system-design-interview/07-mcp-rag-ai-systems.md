# MCP, RAG, and AI Systems Concepts

## MCP

Short definition:

- a protocol that lets a model interact with tools, data, and external systems in a structured way

When to talk about it:

- tool integration
- agents with access to files, APIs, databases, or services
- orchestration of context and actions

## RAG

Short definition:

- retrieval-augmented generation
- before answering, the system retrieves relevant context from documents or external knowledge sources

## Main difference

- MCP is about tool integration and execution
- RAG is about retrieving context to improve the answer

They can coexist.

Example:

- the model uses MCP to query an internal search tool
- that search tool returns documents used in the RAG flow

## Common questions

### When do you use RAG?

- when knowledge changes frequently
- when the model alone is not enough
- when the answer must be grounded in real documents

### Does RAG replace fine-tuning?

- no
- RAG injects current context
- fine-tuning changes model behavior or specialization

### What can go wrong in RAG?

- poor retrieval
- poor chunking
- irrelevant context
- not enough grounding in the final answer

### What can go wrong in MCP?

- poorly defined permissions
- unstable tools
- accumulated latency
- too much context and too many tool calls

## Related terms that may come up

### Embeddings

- vector representations of text used for semantic search

### Re-ranking

- reorders retrieved results to improve relevance

### Tool calling

- the model chooses or is allowed to use a tool
