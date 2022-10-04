import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Failure", () => {
  expect(
    parseStmts(`

failure {
  Friends { left: "mary", right: "mary", alcohol: "gin" }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Failure(
        [],
        [
          Exps.GoalApply(
            "Friends",
            Exps.ObjektUnfolded([
              Exps.PropertyPlain("left", Exps.String("mary")),
              Exps.PropertyPlain("right", Exps.String("mary")),
              Exps.PropertyPlain("alcohol", Exps.String("gin")),
            ]),
          ),
        ],
      ),
    ]),
  )
})
