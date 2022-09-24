import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Goals from "../../../goals"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Rule", () => {
  expect(
    parseStmts(`

query (left) {
  Friends { left, right: "mary", alcohol: "gin" }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Query(
        ["left"],
        [
          new Goals.Apply(
            "Friends",
            Exps.ObjektUnfolded([
              Exps.PropertyPlain("left", Exps.Var("left")),
              Exps.PropertyPlain("right", Exps.String("mary")),
              Exps.PropertyPlain("alcohol", Exps.String("gin")),
            ]),
          ),
        ],
      ),
    ]),
  )
})
