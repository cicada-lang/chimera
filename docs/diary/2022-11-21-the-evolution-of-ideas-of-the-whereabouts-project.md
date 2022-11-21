---
title: The evolution of ideas of the whereabouts project
author: Xie Yuheng
date: 2022-11-21
---

This project starts from practicing unification,
when I need to use unification to implement
implicit arguments for `cicada-lang/cicada`,
I decided to practice implementing unification first.

I wanted to make the code I write more valuable
by making this little practice a useful software.
Thus a full fledged logic programming language.

Then I saw an interesting implementation of "programming by rewriting"
-- [pangloss/pattern](https://github.com/pangloss/pattern),
I want to implement it, because it can be used to implement
nanopass compiler framework and computer algebra system.

Meaning while I have already planned to add data constructor to `cicada-lang/whereabouts`,
a language of "programming by rewriting" can reuse the expressions of `cicada-lang/whereabouts`.

Thus I decided to add "programming by rewriting" to `cicada-lang/whereabouts`.

I observed that, for me,
the main idea about choosing project topic
is to make my code more valuable i.e. more useful.

How to make `cicada-lang/whereabouts` even more valuable?

If I can use it as a database for Web App backend,
it will be very useful to me.

Maybe a simple in-memory database first?

We need:

- Good API to _insert_, _update_ and _delete_ data.
- A solution about persistence the data to disk.
