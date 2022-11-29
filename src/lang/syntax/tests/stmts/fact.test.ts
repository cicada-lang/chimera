import { expect, test } from "vitest"
import * as Exps from "../../../exp"
import * as Stmts from "../../../stmts"
import { parseStmts } from "../../index"
import { deleteUndefined } from "../utils"

test("parse Fact", () => {
  expect(
    parseStmts(`

Male { name: "bertram" }

`),
  ).toMatchObject(
    deleteUndefined([
      new Stmts.RelationFact(
        "Male",
        Exps.Objekt({
          name: Exps.String("bertram"),
        }),
      ),
    ]),
  )
})
