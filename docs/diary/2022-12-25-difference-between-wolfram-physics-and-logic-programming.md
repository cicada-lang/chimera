---
title: Difference between wolfram physics and logic programming
author: Xie Yuheng
date: 2022-12-25
---

Wolfram physics and logic programming are both hypergraph rewriting system,
but there are many difference.

(Note that, we are talking about logic programming,
not constraint logic programming,
which is also hypergraph rewriting system,
but different from logic programming and wolfram physics.
Constraint logic programming as hypergraph rewriting system
is more general than them.)

In logic programming the edges are labeled by a relation name,
and under each name there are many rules,
during rewriting, we can choose one rule of the relation name,
the non-deterministic-ness comes from this choice.

In wolfram physics one universe has only one rule,
the non-deterministic-ness comes from
choosing where to rewrite next.

During the searching game of logic programming,
the aim is to rewrite partial solution (with remaining goals)
to complete solution (without remaining goals).
Beside the above choice, a player also can choose
where (which goal) to rewrite.
This non-deterministic-ness is the same as wolfram physics.

The idea of using hypergraph in logic programming,
is to use the topological and geometrical properties
of the hypergraph (partial solution) and of rules,
to guide how to make the above two kinds of choices.

In my implementation of logic programming,
there are two queues, the solver has a queue of partial solutions,
one solution as a queue of remaining goals,
to guide choices can be implemented as
reordering of these queues.
