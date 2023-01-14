clause Male({ name: "bertram" })
clause Male({ name: "percival" })

clause Female({ name: "lucinda" })
clause Female({ name: "camilla" })

clause Pair({ male, female }) -- {
  Male({ name: male })
  Female({ name: female })
}

print find _ {
  Pair({ male: "bertram", female: "lucinda" })
}

print find _ {
  Pair({ male: "apollo", female: "daphne" })
}

print find female {
  Pair({ male: "percival", female })
}

print find female {
  Pair({ male: "camilla", female })
}

print find male {
  Pair({ male, female: "lucinda" })
}

print find x {
  Pair({ male: x, female: x })
}

print find _ {
  Pair({ female: "fido" })
}

print find [male, female] {
  Pair({ male, female })
}
