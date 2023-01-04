// import { evaluateHyperruleExp } from "../evaluate"
// import type { Mod } from "../mod"
// import * as Hyperrules from "../rule"
// import type { HyperruleExp } from "../rule-exp"
// import type { Span } from "../span"
// import { Stmt } from "../stmt"
// import * as Values from "../value"
// import {
//   varCollectionFromHyperruleExp,
//   varCollectionValidate,
// } from "../var-collection"

// export class Hyperrule extends Stmt {
//   constructor(
//     public name: string,
//     public rules: Array<HyperruleExp>,
//     public span?: Span,
//   ) {
//     super()
//   }

//   boundNamesSync(): Array<string> {
//     return [this.name]
//   }

//   validateSync(mod: Mod): void {
//     for (const rule of this.rules) {
//       varCollectionValidate(varCollectionFromHyperruleExp(rule))
//     }
//   }

//   executeSync(mod: Mod): void {
//     mod.define(
//       this.name,
//       Values.Hyperrule(
//         this.name,
//         Hyperrules.List(
//           this.rules.map((rule) => evaluateHyperruleExp(mod, mod.env, rule)),
//         ),
//       ),
//     )
//   }
// }
