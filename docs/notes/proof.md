---
title: Proof
---

Syntax for writing proofs by hand.

```ts
Member [element, [element, ...tail]]
------------------------------------ here {}

Member [element, [head, ...tail]]
--------------------------------- there {
  Member [element, tail]
}

proof {
  Member ["john", ["paul", "john"]]
  --------------------------------- Member.there {
    Member ["john", ["john"]]
    ------------------------- Member.here
  }
}
```

# nameless relation

We do not have syntax for unnamed relation such as `disj {}`.

Unnamed relation will make us unable to write proofs by hand.
