---
title: Goal as value
author: Xie Yuheng
date: 2023-02-02
---

A relation apply to arguments will get a goal.

We use explicit `satisfy` function to get a boolean value from a goal.

It is important to view goal as value,
because we can use goal in the return value
of hyperrewrite to let the LP handle the goal.

When implement assertion,
we need to view goal as predicate
(call `satisfy` implicitly).
