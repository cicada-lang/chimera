---
title: How to make experiments of new ideas cheap?
author: Xie Yuheng
date: 2022-12-21
---

Experiments we want to try:

- Forward chaining (or say bottom-up search)
  where we accumulate facts in some kind of database.

- Rewriting system that share the same pattern expressions
  with the logic programming language.

To make the experiments cheap,
we must keep the definition of `Exp` and `Value` simple.

Doing a new expression,
amounts to adding new kind of `Exp` and `Value`,
and new methods to process them.
