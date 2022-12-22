---
title: Module system
---

# Import

We can import from URL:

```js
import { Friendship } from "https://cdn.wa.cic.run/docs/books/clause-and-effect/02-drinking-pairs.wa"

find left {
  Friendship({ left, right: "mary", alcohol: "gin" })
}
```
