---
title: Explicit export keyword
author: Xie Yuheng
date: 2023-01-15
---

It is important that we keep name private by default
and use explicit `export` keyword.

`export` can be used as statement prefix,
or export a list of names -- `export { ... }`.

Exporting a list of names is important for `clause`,
where we do not want to use `export` as statement prefix.
