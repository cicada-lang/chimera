---
title: Reify
---

# different outputs

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

# no alpha equivalence

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

# hard to read

Without `reify` it is very hard to read the outputs.

```
[ ["tofu"],
  ["tofu", "?a_5519"],
  ["?a_5488", "tofu"],
  ["tofu", "?a_5519", "?a_5544"],
  ["?a_5488", "tofu", "?a_5548"],
  ["?a_5488", "?a_5506", "tofu"],
  ["tofu", "?a_5519", "?a_5544", "?a_5576"],
  ["?a_5488", "tofu", "?a_5548", "?a_5580"],
  ["?a_5488", "?a_5506", "tofu", "?a_5584"],
  ["?a_5488", "?a_5506", "?a_5531", "tofu"],
  ["tofu", "?a_5519", "?a_5544", "?a_5576", "?a_5615"],
  ["?a_5488", "tofu", "?a_5548", "?a_5580", "?a_5619"] ]
```

v.s.

```
[ ["tofu"],
  ["tofu", "_.0"],
  ["_.0", "tofu"],
  ["tofu", "_.0", "_.1"],
  ["_.0", "tofu", "_.1"],
  ["_.0", "_.1", "tofu"],
  ["tofu", "_.0", "_.1", "_.2"],
  ["_.0", "tofu", "_.1", "_.2"],
  ["_.0", "_.1", "tofu", "_.2"],
  ["_.0", "_.1", "_.2", "tofu"],
  ["tofu", "_.0", "_.1", "_.2", "_.3"],
  ["_.0", "tofu", "_.1", "_.2", "_.3"] ]
```
