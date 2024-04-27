---
title: Set theory as a first principle for the study programming languages
author: Xie Yuheng
date: 2022-11-23
---

A first principle is a model via which other concepts are explained.

By the teaching of Jeremy Siek:

- [Jeremy G. Siek - Crash Course on Notation in Programming Language Theory (Part 1) - λC 2018](https://www.youtube.com/watch?v=vU3caZPtT2I)
- [Jeremy G. Siek - Crash Course on Notation in Programming Language Theory (Part 2) - λC 2018](https://www.youtube.com/watch?v=MhuK_aepu1Y)

I understand why the book EOPL ("Essentials of Programming Languages")
starts from chapter "Inductive Sets of Data".

I also understand why we say "everything is expressions" in "The Little Typer".

Set theory is a very good starting point to introduce concepts of programming languages:

- Grammar -- the set of expressions.
- Relation -- set of tuples.
- Function -- univalent Relation.
- Inference rule -- definition of judgment (relation) by clauses.

Set theory is very useful to understand logic programming languages like whereabouts,
where there are only the set of data -- JSON and terms,
and relations (predicates) over them -- [first order logic](https://en.wikipedia.org/wiki/First-order_logic).

V.V. talked about manipulating expressions about proof
as easy as manipulating expressions of polynomials
(maybe we should say manipulating expressions in some context),
when implementing languages we often loss this ease of manipulation,
while thinking in terms of sets can help us restore some of this ease.
