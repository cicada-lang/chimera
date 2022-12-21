---
title: Logic programming as hypergraph rewriting
author: Xie Yuheng
date: 2022-12-21
---

# Intro to hypergraph rewriting

TODO Hypergraph theory = circuit diagram

- https://en.wikipedia.org/wiki/Circuit_diagram

# Bottom-up view of logic programming as hypergraph rewriting

A set of facts (without variables) forms a hypergraph.

- A term (or say data) (without variables) is a **vertex**.

- A fact about a relation is an **edge**.

Notes:

- By "edge" we always means hyperedge which might have any arity.

- Each edge is labelled by a relation name.

A inference rule is a hypergraph rewrite rule,
which generates the whole (maybe infinite) hypergraph step by step.

In bottom-up view, we apply an inference rule from premises to conclusion,
first matches the premises of the rule to the edges in the hypergraph
then use the conclusion to output a new edge,
and add it to the hypergraph.

We are always adding new edges to hypergraph,
matched edges (premises) are not removed from the hypergraph,
added edge is persistent in the database of vertices and edges.

A set of clauses (facts and rules) can be viewed as
defining an infinite hypergraph
using only finite expressions and functions on the expressions.

|           | logic programming     | hypergraph rewriting            |
| --------- | --------------------- | ------------------------------- |
| inference | generating more facts | generating the whole hypergraph |

# Top-down view of logic programming as hypergraph rewriting

A set of goals (or say constraints) (with variables) forms a hypergraph.

- A logic variable (or say pattern variable) is a **vertex**.

- A term (or say data) (might contain variables) is a **vertex**.

- A goal, i.e. an application of a relation
  to arguments (which might be variable),
  is an **edge**.

In top-down view, we apply an inference rule from conclusion to premises,
first matches the conclusion of the rule to the edges in the hypergraph,
then use the conclusion to output a new edge,
and replaced premises edges with the conclusion edge.

Notes:

- We see that a rewrite rule of hypergraph can be applied forward and backward.

A hypergraph is a query, to answer it is to normalize it by rewriting.

|           | logic programming       | hypergraph rewriting                      |
| --------- | ----------------------- | ----------------------------------------- |
| inference | answering logical query | answering hypergraph query                |
|           |                         | (without generating the whole hypergraph) |

# Remove the tree structure of terms

One problem of the above views is that,
a term already has a tree structure,
and primitive operations in terms of
hypergraph graph rewriting rule,
already contains complicate operations such as
matching and unifcation between terms.

In our hypergraph, each vertex is actually a little tree.

We can remove this tree structure
and making the vertices of our hypergraph only contains atomic data
(like string, number and variable).

We achieve this by viewing accessing path as special relation (special edge),
for example, one relation

```
z = f(x, 1)
```

or say

```
Equal [z, f(x, 1)]
```

can be decomposed to three relations `Head`, `Body[0]`, `Body[1]`

```
Head [z, "f"]
Body[0] [z, x]
Body[1] [z, 1]
```

By doing this, we move the information from tree vertices to edges.

Note that, this approach is used in some databases to normalize data.

For example in Datomic, a nested record-like data will be flatten to a set of tuples.

A tuple is of the form `[Entity, Attribute, Value]`, where

- The `Entity` is an id;
- The `Value` is atomic data like string and number;
- The `Attribute` is a name which can be represented by a string.

For example

```
{
  user_name: "xieyuheng",
  email: "hi@xieyuheng.com",
  projects: [
    { project_name: "cicada" },
    { project_name: "whereabouts" },
  ]
}
```

Will be stored as

```
[1, "user_name", "xieyuheng"]
[1, "email", "hi@xieyuheng.com"]
[1, "projects", 2]
[1, "projects", 3]
[2, "project_name", "cicada"]
[3, "project_name", "whereabouts"]
```

A set of tuples can be viewed as a graph (not hypergraph),
where an edge is a tuple `[Entity, Attribute, Value]`
connecting the entity to the value,
and the attribute is the labelled of the edge.

# Generalize to cell-complex

Can we generalize the representation of hypergraphs (in topos theory) to represent cell-complex?

~/topics/mathematics/category-theory/generic-figures-and-their-glueings--a-constructive-approach-to-functor-categories.djvu

~/persons/william-lawvere/conceptual-mathematics.djvu

# Using hypergraph's properties to guide searching

TODO

- https://en.wikipedia.org/wiki/Hypergraph
- https://en.wikipedia.org/wiki/Term_algebra

# Context free v.s. context sensitive rewriting rule

TODO

- logic programming = context free non-deterministic hypergraph rewriting
- constraint system = context sensitive deterministic hypergraph rewriting
