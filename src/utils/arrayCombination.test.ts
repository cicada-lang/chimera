import { expect, test } from "vitest"
import { arrayCombination } from "./arrayCombination"

test("arrayCombination", () => {
  expect(arrayCombination([1, 2, 3], 2)).toEqual([
    [2, 1],
    [3, 1],
    [3, 2],
  ])

  expect(arrayCombination([1, 2, 3, 4], 2)).toEqual([
    [2, 1],
    [3, 1],
    [4, 1],
    [3, 2],
    [4, 2],
    [4, 3],
  ])

  expect(arrayCombination([1, 2, 3, 4], 3)).toEqual([
    [3, 2, 1],
    [4, 2, 1],
    [4, 3, 1],
    [4, 3, 2],
  ])
})
