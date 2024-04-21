import assert from "node:assert"
import { test } from "node:test"
import { arrayCombination } from "./arrayCombination"

test("arrayCombination", () => {
  assert.deepStrictEqual(arrayCombination([1, 2, 3], 2), [
    [2, 1],
    [3, 1],
    [3, 2],
  ])

  assert.deepStrictEqual(arrayCombination([1, 2, 3, 4], 2), [
    [2, 1],
    [3, 1],
    [4, 1],
    [3, 2],
    [4, 2],
    [4, 3],
  ])

  assert.deepStrictEqual(arrayCombination([1, 2, 3, 4], 3), [
    [3, 2, 1],
    [4, 2, 1],
    [4, 3, 1],
    [4, 3, 2],
  ])
})
