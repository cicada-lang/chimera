query (abc) {
  unify abc = ["a", "b", "c"]
}

query (a, b, c) {
  unify [a, b, c] = ["a", "b", "c"]
}

query (empty) {
  unify empty = []
}
