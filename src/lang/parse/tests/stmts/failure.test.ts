import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Goals from "../../../goal"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Failure", () => {
  expect(
    parseStmts(`

failure (left) {
  Friends { left, right: "mary", alcohol: "gin" }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Failure(
        ["left"],
        [
          Goals.Apply(
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

test("parse Failure -- no name", () => {
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
          Goals.Apply(
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

test("parse Failure -- no name 2", () => {
  expect(
    parseStmts(`

failure () {
  Friends { left: "mary", right: "mary", alcohol: "gin" }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Failure(
        [],
        [
          Goals.Apply(
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
