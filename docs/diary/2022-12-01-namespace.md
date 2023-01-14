---
title: Namespace
author: Xie Yuheng
date: 2022-12-01
---

A namespace is a prefix that
can be used in `prefix::name` syntax to reference a value.

A module can be imported as a namespace.

```cicada
import Exp from "exp.mo"
```

Importing two modules as the same namespace,
the names in the the modules will be merged.

```cicada
import Exp from "exp.mo"
import Exp from "exp-extra.mo"
```

Datatype can be used as a namespace,
to reference it's data constructors.

```cicada
datatype Exp {
  var(name)
  fn(name, ret) -- { Exp ret }
  ap(target, arg) -- { Exp target Exp arg }
}

Exp::var(name)
Exp::fn(name, ret)
Exp::ap(target, arg)
```

When using `import <name>`,
a namespace will be imported,
the name in the module will also be imported,
if the name is bound to a namespace in the module,
the namespace will be merged.

Thus, to use the a datatype named `Exp` in the module "exp.mo",
we do not have to write:

```cicada
import Exp from "exp.mo"
import { Exp } from "exp.mo"
```

We can simply write:

```cicada
import Exp from "exp.mo"
```

We can also provide a `namespace {}` keyword,
to define many (nested) namespaces in one module.

Use `import * from` to import all names without namespace prefix,
this feature can be used to reexport names in many modules from one module.

```cicada
import * from "exp.mo"
```
