---
title: Reify
---

Without `reify` the following queries have different outputs:

```
query q {
  unify q = q
}

// [ "?q" ]

query q {
  unify q = x
}

// [ "?x" ]
```

Without `reify` we do not have alpha equivalence between expressions
-- consistently changing the names of pattern variables.

```
query q {
  unify [x, y] = q
}

// [ ["?x", "?y"] ]

query s {
  unify [t, u] = s
}

// [ ["?t", "?u"] ]
```
