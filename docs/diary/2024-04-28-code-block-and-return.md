---
title: code block and return
author: Xie Yuheng
date: 2024-04-28
---

关于 code block 与 return，我能想到下面几种设计方案：

- (1) 放弃 code block 作为 expression，直接模仿 JS 语法。

- (2) code block 作为 expression，此时不能用明显的 return，
  应该设计为最后一个 expression 作为 implicit return value。
  因为 return 与 early return 相冲突。
  - 并且这里没有更好的语法关键词选择，
    `yield` `give` 等等都不太好。

我选择方案 (2)。
