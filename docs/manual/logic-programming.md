---
title: Logic programming
---

Logic programming with [JSON](https://www.json.org).

In the sense that the syntax is close to JavaScript,
and user can choose to format the query outputs
to canonical [JSON lines](https://jsonlines.org

# Syntax

We use reversed inference rule style syntax for defining relation.

Instead of writing inference rule:

```
premise
premise
...
----------
conclusion
```

We write reversed inference rule (which is easier to edit):

```
conclusion
----------- {
  premise
  premise
  ...
}
```

# Examples

[**02-drinking-pairs.wa:**](../books/clause-and-effect/02-drinking-pairs.wa)

```js
Drink { person: "john", alcohol: "martini" }
Drink { person: "mary", alcohol: "gin" }
Drink { person: "susan", alcohol: "vodka" }
Drink { person: "john", alcohol: "gin" }
Drink { person: "fred", alcohol: "gin" }
Drink { person: "fred", alcohol: "vodka" }

Friendship { left, right, alcohol }
------------------------------------ {
  Drink { person: left, alcohol }
  Drink { person: right, alcohol }
}

find left {
  Friendship { left, right: "mary", alcohol: "gin" }
}

find [left, right] {
  Friendship { left, right, alcohol: "gin" }
}

find [left, right, alcohol] {
  Friendship { left, right, alcohol }
}
```

The above example use JSON object, we can also use JSON array.

[**03-affordable-journeys.wa:**](../books/clause-and-effect/03-affordable-journeys.wa)

```js
Border ["sussex", "kent"]
Border ["sussex", "surrey"]
Border ["surrey", "kent"]
Border ["hampshire", "sussex"]
Border ["hampshire", "surrey"]
Border ["hampshire", "berkshire"]
Border ["berkshire", "surrey"]
Border ["wiltshire", "hampshire"]
Border ["wiltshire", "berkshire"]

Adjacent [x, y]
---------------- border {
  Border [x, y]
}

Adjacent [x, y]
---------------- symmetry {
  Border [y, x]
}

Affordable [x, y]
-------------------- {
  Adjacent [x, z]
  Adjacent [z, y]
}

find to_kent {
  Affordable [to_kent, "kent"]
}

find to_sussex {
  Affordable ["sussex", to_sussex]
}

find [x, y] {
  Affordable [x, y]
}
```
