---
title: No REPL
---

To have a REPL, the syntax must be line-by-line unambiguous and no error.

For example:

```
Pair { male, female }
------------------------ {
  Male { name: male }
  Female { name: female }
}
```

The line

```
Pair { male, female }
```

is a valid statement,
when processed line-by-line,
it will be committed,

But the code follows this line is not valid:

```
------------------------ {
  Male { name: male }
  Female { name: female }
}
```

The whole code is not ambiguous,
but when processed line-by-line,
it is ambiguous and has syntax error.
