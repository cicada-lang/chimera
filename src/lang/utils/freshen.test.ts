import assert from "node:assert/strict"
import test from "node:test"
import { freshen } from "./freshen"

test("freshen create new string not in set", () => {
  assert.strictEqual(freshen(["x"], "x"), "x1")
  assert.strictEqual(freshen(["x", "x1"], "x"), "x2")
  assert.strictEqual(freshen(["x", "x1", "x2"], "x"), "x3")
})
