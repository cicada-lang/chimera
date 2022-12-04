---
title: Remove datatype keyword and keep using data freely
author: Xie Yuheng
date: 2022-12-05
---

Due to performance reason,
we should not check data constructors at runtime.

(And it might does not make sense to
add a type-check-time to relational language.)

Thus we keep it simple and remove `datatype` keyword.

We also can not use namespace,
because it's syntax is the same as data constructor.
