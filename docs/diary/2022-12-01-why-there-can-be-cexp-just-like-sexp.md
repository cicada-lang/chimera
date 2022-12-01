---
title: Why there can be cexp? (just like sexp)
author: Xie Yuheng
date: 2022-12-01
---

It will be good if we have something like cexp.

We can use it to support the `quote <exp>` keyword.

Even if we do not support macro,
we can use this to implement structural comments,
which can be further used to prototype new syntax.

To support macro syntax, maybe we can simply add `unquote <exp>`.

But even we have a canonical way of design C-family syntax.
we can not have something like cexp.

Why?

Because there will be too many variants.

Think about what will be the _general form_.

Maybe:

```
<element> :=
  <tag> (<binding>, ...) <element>
| <tag> (<binding>, ...) { <element> ... }
```

We must view the following as sugars:

- `[ ... ]` -- `array { ... }`
- `(...) -> ...` -- `forall (...) ...`
- `(...) => ...` -- `lambda (...) ... `
- `f(x, y)` -- `apply { target f arg x arg y }`

The above sugars are ok.

But the above general form is far from including all existing syntax.

Seems hopeless.
