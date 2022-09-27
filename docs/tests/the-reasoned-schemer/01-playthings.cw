Succeed []

Fail []
-------- {
  unify 1 = 2
}

query (q) {
  Fail []
}

failure {
  Fail []
}

success {
  Succeed []
}

query (q) {
  unify "pea" = "pod"
}

query (q) {
  unify q = "pea"
}

query (q) {
  unify "pea" = q
}
