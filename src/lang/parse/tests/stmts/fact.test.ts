import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Fact", () => {
  expect(parseStmts(`

fact Male { name: "bertram" }

`)).toMatchObject(
    deleteUndefined([
      new Stmts.Fact(
        "Male",
        Exps.ObjektUnfolded([
          Exps.PropertyPlain("name", Exps.String("bertram")),
        ]),
      ),
    ]),
  )
})
