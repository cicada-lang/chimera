---
title: Expression as Statement
author: Xie Yuheng
date: 2023-01-10
---

I do not know why (without preserve `clause` as keyword)
the current grammar will not make `clause F(1)` ambiguous,
which might mean `clause F(1)` or `clause; F(1);`.

Problem: "expression as statement" is ambiguous.

- Solution 1: Use ';'.
- Solution 2: Use `compute` as prefixing keyword.
