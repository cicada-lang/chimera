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

```mo
clause Append([], right, right)
---------------------------- {}

clause Append(
  [head | left_tail],
  right,
  [head | result_tail],
)
---------------- {
  Append(left_tail, right, result_tail)
}

print find [result] {
  Append(
    [1, 2],
    [3, 4],
    result,
  )
}

// run it backward

print find [left, right] {
  Append(
    left,
    right,
    [1, 2, 3, 4],
  )
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

```mo todo
clause Merge(null, right, right)
------------------------ {}

clause Merge(left, null, left)
------------------------ {}

clause Merge(
  [left_head | left_tail],
  [head | right_tail],
  [head | result_tail],
)
---------------- {
  Merge(left, right_tail, result_tail)
  FD::Gt(left_head, head)
}

clause Merge(
  [head | left_tail],
  [right_head | right_tail],
  [head | result_tail],
)
---------------- {
  Merge(
    left_tail,
    [right_head | right_tail],
    result_tail,
  )
  FD::Gt(right_head, head)
}

print find [result] {
  Merge(
    [1, 2],
    [3, 4],
    result
  )
}

print find [left, right] {
  Merge(
    left,
    right,
    [1, 2, 3, 4]
  )
}
```
