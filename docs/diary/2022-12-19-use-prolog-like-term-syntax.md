---
title: Use prolog like term syntax
author: Xie Yuheng
date: 2022-12-19
---

Use

```
fn("f", ap(var("f"), var("f")))
```

with less syntax noise, instead of

```
Exp::fn("f", Exp::ap(Exp::var("f"), Exp::var("f")))
```
