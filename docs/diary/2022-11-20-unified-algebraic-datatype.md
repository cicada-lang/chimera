---
title: Unified algebraic datatype
author: Xie Yuheng
date: 2022-11-20
---

ADT is important for implementing language expressions.

We should support data constructors
and convert them back and forth to JSON.

No need for datatype definition,
thus not need for a type system yet,
just a syntax sugar:

```
List::cons(x, y)
```

Is the same as:

```
{
  "@type": "List",
  "@kind": "cons",
  "@args": [x, y]
}
```

Adding `@` for such meta property to avoid preserving property names,
This is learned from [JSON Linked Data](https://en.wikipedia.org/wiki/JSON-LD).

We call this "unified algebraic datatype",
because this idea can be used in different languages:

- typescript -- at least this is valid in typescript,
  but maybe we should not use this all the time.

- whereabouts & rewrite -- these are our languages,
  we can just use the same idea in them.

- cicada -- can exchange data in this format.

TODO Learn more from json semantic web: https://en.wikipedia.org/wiki/JSON-LD

TODO Learn naming from: https://en.wikipedia.org/wiki/Algebraic_data_type
