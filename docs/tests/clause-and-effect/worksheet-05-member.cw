// Member [element, { head: element, tail: tail }]
// ------------------------------------------------ here {}

// Member [element, { head, tail }]
// ------------------------------------------------ there {
//   Member [element, tail]
// }

// // success {
// //   Member ["john", { head: "paul", tail: { head: "john", tail: null }}]
// // }

// // function cons(head, tail) {
// //   return { head, tail }
// // }

// // failure {
// //   Member ["joe", cons("marx", cons("darwin", ("freud", null)))]
// // }

// // // TODO Maybe a functional part of the language (a subset of JavaScript).

// // let results = query (element) {
// //   Member [element, cons("paul", cons("john", null))]
// // }

// // assert_equal [
// //   results,
// //   ["paul", "john"]
// // ]


// query (list) {
//   limit 3
//   Member ["foo", list]
// }
