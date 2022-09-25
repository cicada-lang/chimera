Member [element, { head: element, tail: tail }]
------------------------------------------------ here {}

Member [element, { head, tail }]
------------------------------------------------ there {
  Member [element, tail]
}

success {
  Member ["john", { head: "paul", tail: { head: "john", tail: null }}]
}

failure {
  Member ["joe", { head: "marx", tail: { head: "darwin", tail: { head: "freud", tail: null }}}]
}

query (element) {
  Member [element, { head: "marx", tail: { head: "darwin", tail: { head: "freud", tail: null }}}]
}

// TODO need query limit

// query (list) {
//   Member ["foo", list]
// }
