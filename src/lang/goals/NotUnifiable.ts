// import { Goal } from "../goal"
// import { GoalQueue } from "../goal"
// import { Solution } from "../solution"

// export class NotUnifiable<T> extends Goal {
//   left: Logical<T>
//   right: Logical<T>

//   constructor(left: Logical<T>, right: Logical<T>) {
//     super()
//     this.left = left
//     this.right = right
//   }

//   static create<T>(left: Logical<T>, right: Logical<T>): NotUnifiable<T> {
//     return new NotUnifiable(left, right)
//   }

//   evaluate(solution: Solution): Array<GoalQueue> {
//     const newSolution = solution.unify(this.left, this.right)
//     if (newSolution !== null) {
//       return []
//     } else {
//       return [new GoalQueue(solution, [])]
//     }
//   }
// }
