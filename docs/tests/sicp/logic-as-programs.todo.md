# Logic as programs

Some examples about translating functions to logic relations.

We import `logic-db` first

```js
let logic = require("logic-db")
```

and prepare the lispy list

```js
function cons(x, y) {
  return { car: x, cdr: y }
}
```

## append

```js
{
  // function

  function append(ante, succ) {
    if (ante === null) {
      return succ
    } else {
      return cons(ante.car, append(ante.cdr, succ))
    }
  }

  append(cons(1, cons(2, null)), cons(3, cons(4, null)))
  // equals to
  cons(1, cons(2, cons(3, cons(4, null))))
}

{
  // relation

  let append = new logic.db_t()

  append.i({
    ante: null,
    succ: "?succ",
    result: "?succ",
  })

  append
    .i({
      ante: { car: "?car", cdr: "?ante_cdr" },
      succ: "?succ",
      result: { car: "?car", cdr: "?result_cdr" },
    })
    .cond((the) => {
      return append.o({
        ante: the.var.ante_cdr,
        succ: the.var.succ,
        result: the.var.result_cdr,
      })
    })

  append.query_log(1)({
    ante: cons(1, cons(2, null)),
    succ: cons(3, cons(4, null)),
    result: "?result",
  })

  // run it backward

  append.query_log(10)({
    ante: "?ante",
    succ: "?succ",
    result: cons(1, cons(2, cons(3, cons(4, null)))),
  })
}
```

## merge

```js
{
  // function

  function merge(ante, succ) {
    if (ante === null) {
      return succ
    } else if (succ === null) {
      return ante
    } else if (ante.car < succ.car) {
      return cons(ante.car, merge(ante.cdr, succ))
    } else {
      return cons(succ.car, merge(ante, succ.cdr))
    }
  }

  merge(cons(1, cons(3, null)), cons(2, cons(4, null)))
  // equals to
  cons(1, cons(2, cons(3, cons(4, null))))
}

{
  // relation

  let merge = new logic.db_t()

  merge.i({
    ante: null,
    succ: "?succ",
    result: "?succ",
  })

  merge.i({
    ante: "?ante",
    succ: null,
    result: "?ante",
  })

  merge
    .i({
      ante: { car: "?ante_car", cdr: "?ante_cdr" },
      succ: { car: "?car", cdr: "?succ_cdr" },
      result: { car: "?car", cdr: "?result_cdr" },
    })
    .cond((the) => {
      return merge
        .o({
          ante: the.data.ante,
          succ: the.var.succ_cdr,
          result: the.var.result_cdr,
        })
        .pred((subst) => subst.get(the.var.ante_car) > subst.get(the.var.car))
    })

  merge
    .i({
      ante: { car: "?car", cdr: "?ante_cdr" },
      succ: { car: "?succ_car", cdr: "?succ_cdr" },
      result: { car: "?car", cdr: "?result_cdr" },
    })
    .cond((the) => {
      return merge
        .o({
          ante: the.var.ante_cdr,
          succ: the.data.succ,
          result: the.var.result_cdr,
        })
        .pred((subst) => subst.get(the.var.succ_car) > subst.get(the.var.car))
    })

  merge.query_log(1)({
    ante: cons(1, cons(2, null)),
    succ: cons(3, cons(4, null)),
    result: "?result",
  })

  merge.query_log(1)({
    ante: cons(1, cons(3, null)),
    succ: cons(2, cons(4, null)),
    result: "?result",
  })

  merge.query_log(10)({
    ante: "?ante",
    succ: "?succ",
    result: cons(1, cons(2, cons(3, cons(4, null)))),
  })
}
```
