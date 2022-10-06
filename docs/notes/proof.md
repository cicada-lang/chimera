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
