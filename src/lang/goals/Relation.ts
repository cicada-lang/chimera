// import { Goal } from "../goal"
// import { GoalQueue } from "../goal"
// import * as Clauses from "../clauses"
// import { Table } from "../table"
// import { Var, freshenValue } from "../value"
// import { Ctx } from "../ctx"
// import { Logical, VarFinder } from "../value"
// import { Solution } from "../solution"

// export class Relation<T> extends Goal {
//   table: Table<T>
//   data: Logical<T>

//   constructor(opts: { table: Table<T>; data: Logical<T> }) {
//     super()
//     this.table = opts.table
//     this.data = opts.data
//   }

//   evaluate(solution: Solution): Array<GoalQueue> {
//     const queues: Array<GoalQueue> = []

//     for (const clause of this.table.clauses) {
//       const data = freshenValue(clause.data)
//       const newSolution = solution.unify(data, this.data)
//       if (newSolution !== null) {
//         if (clause instanceof Clauses.Fact) {
//           queues.push(new GoalQueue(newSolution, []))
//         } else if (clause instanceof Clauses.Rule) {
//           const v = Var.finderFromVarMap(Var.extractVarMap(data))
//           const ctx = new Ctx(newSolution)
//           queues.push(new GoalQueue(newSolution, clause.premises(v, ctx)))
//         } else {
//           throw new Error(`Unknown clause type: ${clause.constructor.name}`)
//         }
//       }
//     }

//     return queues
//   }
// }
