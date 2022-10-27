import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Query", () => {
  expect(
    parseStmts(`

find [left] {
  Friendship { left, right: "mary", alcohol: "gin" }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Find(
        Stmts.QueryPatternNames(["left"]),
        [],
        [
          Exps.GoalApply(
            "Friendship",

            Exps.ObjektUnfolded([
              Exps.PropertyPlain("left", Exps.PatternVar("left")),
              Exps.PropertyPlain("right", Exps.String("mary")),
              Exps.PropertyPlain("alcohol", Exps.String("gin")),
            ]),
          ),
        ],
      ),
    ]),
  )
})

test("parse Query -- with limit", () => {
  expect(
    parseStmts(`

find [left] limit 1 {
  Friendship { left, right: "mary", alcohol: "gin" }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Find(
        Stmts.QueryPatternNames(["left"]),
        [Stmts.FindOptionLimit(1)],
        [
          Exps.GoalApply(
            "Friendship",

            Exps.ObjektUnfolded([
              Exps.PropertyPlain("left", Exps.PatternVar("left")),
              Exps.PropertyPlain("right", Exps.String("mary")),
              Exps.PropertyPlain("alcohol", Exps.String("gin")),
            ]),
          ),
        ],
      ),
    ]),
  )
})
