query (abc) {
  equation abc = {
    a: "a",
    b: "b",
    c: "c",
  }
}

query (a, b, c) {
  equation { a, b, c } = {
    a: "a",
    b: "b",
    c: "c",
  }
}

query (empty) {
  equation empty = {}
}
