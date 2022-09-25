import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Goals from "../../../goals"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Rule", () => {
  expect(
    parseStmts(`

Friends { left, right, alcohol }
------------------------------------ {
  Drink { person: left, alcohol }
  Drink { person: right, alcohol }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Rule(
        "Friends",
        undefined,
        Exps.ObjektUnfolded([
          Exps.PropertyPlain("left", Exps.Var("left")),
          Exps.PropertyPlain("right", Exps.Var("right")),
          Exps.PropertyPlain("alcohol", Exps.Var("alcohol")),
        ]),
        [
          new Goals.Apply(
            "Drink",
            Exps.ObjektUnfolded([
              Exps.PropertyPlain("person", Exps.Var("left")),
              Exps.PropertyPlain("alcohol", Exps.Var("alcohol")),
            ]),
          ),
          new Goals.Apply(
            "Drink",
            Exps.ObjektUnfolded([
              Exps.PropertyPlain("person", Exps.Var("right")),
              Exps.PropertyPlain("alcohol", Exps.Var("alcohol")),
            ]),
          ),
        ],
      ),
    ]),
  )
})
