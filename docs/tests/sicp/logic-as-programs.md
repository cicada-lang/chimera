# Logic as programs

Some examples about translating functions to logic relations.

We prepare the lispy list

```js
function cons(head, tail) {
  return { head, tail }
}
```

## append

**Function:**

```js
function append(left, right) {
  if (left === null) {
    return right
  } else {
    return cons(left.head, append(left.tail, right))
  }
}

append(cons(1, cons(2, null)), cons(3, cons(4, null)))
// equals to
cons(1, cons(2, cons(3, cons(4, null))))
```

**Relation:**

```js
Append [null, right, right]
---------------------------- {}

Append [
  { head, tail: left_tail },
  right,
  { head, tail: result_tail },
]
---------------- {
  Append [left_tail, right, result_tail]
}

query (result) {
  Append [
    cons(1, cons(2, null)),
    cons(3, cons(4, null)),
    result,
  ]
}

// run it backward

query (left, right) {
  Append [
    left,
    right,
    cons(1, cons(2, cons(3, cons(4, null)))),
  ]
}
```

## merge

**Function:**

```js
function merge(left, right) {
  if (left === null) {
    return right
  } else if (right === null) {
    return left
  } else if (left.head < right.head) {
    return cons(left.head, merge(left.tail, right))
  } else {
    return cons(right.head, merge(left, right.tail))
  }
}

merge(cons(1, cons(3, null)), cons(2, cons(4, null)))
// equals to
cons(1, cons(2, cons(3, cons(4, null))))
```

**Relation:**

```js
Merge [null, right, right]
------------------------ {}

Merge [left, null, left]
------------------------ {}

Merge [
  { head: left_head, tail: left_tail },
  { head, tail: right_tail },
  { head, tail: result_tail },
]
---------------- {
  Merge [left, right_tail, result_tail]
  unify left_head > head
}

Merge [
  { head, tail: left_tail },
  { head: right_head, tail: right_tail },
  { head, tail: result_tail },
]
---------------- {
  Merge [
    left_tail,
    { head: right_head, tail: right_tail },
    result_tail,
  ]
  unify right_head > head
}

query (result) {
  Merge [
    cons(1, cons(2, null)),
    cons(3, cons(4, null)),
    result
  ]
}

query (left, right) {
  Merge [
    left,
    right,
    cons(1, cons(2, cons(3, cons(4, null))))
  ]
}
```
