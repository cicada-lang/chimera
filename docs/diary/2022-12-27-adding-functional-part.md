---
title: Adding functional part
author: Xie Yuheng
date: 2022-12-27
---

I thought we do not need a functional part at [2022-11-19-functional-part.md](2022-11-19-functional-part.md).

But actually having a functional part is very convenient,
for examples, we can:

- Use term rewrite rule as function.
- Use relation as predicate.
- Use predicate as runtime type assertion (active during test only).
  - Using `declare` as keyword.

And instead of implementing `rewrite`
and `hyperrewrite` as separate syntax keywords,
we can use `compute` for all kind of applications.

Adding a functional part to this language will be super fun.
We can also compile it and make it a self-hosting
-- to not depends on JavaScript anymore.
