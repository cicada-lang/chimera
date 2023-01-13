---
title: Primitive functions and import all
author: Xie Yuheng
date: 2023-01-14
---

We need a lot of primitive functions about `String`, `Number` and `Array` ...

We use the most simple solution,
just import all of them into a every module.

- `stringLength`, `stringAppend`, ...
- `arrayLength`, `arrayAppend`, ...

The names are not preserved one can redefine them if need.

Should we remove the `import * from ...` syntax?

We should not, because if we are import all of the primitive functions
into every module, we should also let user do the same.

And if we have import all, we also need the `private` keyword.

# built-in functions v.s. built-in modules

Should we add lot of built-in modules instead of built-in functions?

We should not, because `String` and `Number`
are already used as built-in `TypeConstraint`.

We can not use them as built-in module name,
and other names does not make sense.
