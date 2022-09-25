import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Goals from "../../../goal"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Success", () => {
  expect(
    parseStmts(`

success (left) {
  Friends { left, right: "mary", alcohol: "gin" }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Success(
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

test("parse Success -- no name", () => {
  expect(
    parseStmts(`

success {
  Friends { left: "mary", right: "mary", alcohol: "gin" }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Success(
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

test("parse Success -- no name 2", () => {
  expect(
    parseStmts(`

success () {
  Friends { left: "mary", right: "mary", alcohol: "gin" }
}

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.Success(
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
