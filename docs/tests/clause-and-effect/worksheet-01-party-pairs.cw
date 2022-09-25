Male { name: "bertram" }
Male { name: "percival" }

Female { name: "lucinda" }
Female { name: "camilla" }

Pair { male, female }
------------------------ {
  Male { name: male }
  Female { name: female }
}

// success {
//   Pair { male: "bertram", female: "lucinda" }
// }

// failure {
//   Pair { male: "apollo", female: "daphne" }
// }

query (female) {
  Pair { male: "percival", female }
}

query (female) {
  Pair { male: "camilla", female }
}

query (male) {
  Pair { male, female: "lucinda" }
}

query (x) {
  Pair { male: x, female: x }
}

query (x) {
  Pair { male, female: "fido" }
}

query (male, female) {
  Pair { male, female }
}
