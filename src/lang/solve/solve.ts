import { pursue } from "../pursue/index.js"
import { solutionUpdate, type Solution } from "../solution/index.js"

/**

   Constraint logic programming seems to me
   much like how a person solve a problem
   by working on partial solutions until some of them are complete.

   Every problem is a partial solution.
   Think about this!

   The `solve` function takes a problem,
   and has a queue of partial solutions,
   one solution represents a path we are searching.

   A `Solution` has a queue of `goals`,
   if the queue is empty the solution is complete,
   if the queue is not empty the solution is partial.

   Beside the `goals`, a `Solution` also has many kind of constraints,
   among which the most important one is `substitution` of bindings,
   `goals` can be viewed as special constraint.

   To work on a solution is to pursue it's first goal.

   Working on a solution might generate new solutions to work on,
   for examples, one new solution for each clause of a relation,
   or one new solution for each subgoal of a disjunction,
   representing a new branching path to search.

   ------

   翻译：

   约束式逻辑编程在我看来像是在模拟人解决问题的过程，
   即研究部分解决方案直到它变为完全解决方案。

   每个问题都是一个部分解决方案。
   （多么积极的思考方式！）

   `solve` 函数拿到一个问题之后，
   会维护一个队列的部分解决方案等着处理，
   队列中的每个解决方案都代表了我们正在搜索的一条路径。

   一个解决方案（`Solution`）
   有一个队列的目标（`goals`），
   如果这个队列是空的，那么这个解决方案就是完全的，
   否则，这个解决方案就是不完全的，即部分的。

   除了为纯粹逻辑式编程而设置的 `goals` 之外，
   一个 `Solution` 还拥有多种约束，
   其中最重要的是记变元所绑定到的值的 `substitution`，
   其实 `goals` 也可以被认为是一种特殊的约束。

   推进一个部分解决方案就在于追求其首要目标。
   或者说，研究一个问题就在于研究其首要目标。
   （多么专注且高效的思考方式！）

   推进一个部分解决方案，
   可能会生成新的有待研究的解决方案。
   例如，一个关系的每一个从句，
   都会都会生成一个新的部分解决方案，
   代表了搜索过程中的一个新的分支。

   ------

   注释：

   这里所描述的其实是 Simon 的 Problem Space Model，
   只是把这个 Model 或者说 Pattern，
   应用于实现约束式逻辑语言了而已。

**/

export function solve(
  problem: Solution,
  options: { limit: number },
): Array<Solution> {
  const problems = [problem]
  const solutions: Array<Solution> = []
  const limit = options.limit || Infinity
  while (true) {
    if (solutions.length >= limit) {
      // NOTE We might find more then one solutions in one step,
      // thus the length of `solutions` might be larger than the `limit`.
      return solutions.slice(0, limit)
    }

    // NOTE Working on the first `problem`.
    const problem = problems.shift()
    if (problem === undefined) {
      return solutions
    }

    if (problem.goals.length === 0) {
      solutions.push(problem)
      continue
    }

    const [goal, ...restGoals] = problem.goals
    const newSolution = solutionUpdate(problem, { goals: restGoals })
    const newProblems = pursue(newSolution, goal)

    // NOTE We try to be fair by pushing
    // the newly generated partial solutions to the end.
    for (const solution of newProblems) {
      if (solution.goals.length === 0) {
        solutions.push(solution)
      } else {
        problems.push(solution)
      }
    }
  }
}
