// import { Goal } from "../goal"
// import { GoalQueue } from "../goal"
// import { Solution } from "../solution"

// export class Unifiable<T> extends Goal {
//   left: Logical<T>
//   right: Logical<T>

//   constructor(left: Logical<T>, right: Logical<T>) {
//     super()
//     this.left = left
//     this.right = right
//   }

//   static create<T>(left: Logical<T>, right: Logical<T>): Unifiable<T> {
//     return new Unifiable(left, right)
//   }

//   evaluate(solution: Solution): Array<GoalQueue> {
//     const newSolution = solution.unify(this.left, this.right)
//     if (newSolution !== null) {
//       return [new GoalQueue(newSolution, [])]
//     } else {
//       return []
//     }
//   }
// }
