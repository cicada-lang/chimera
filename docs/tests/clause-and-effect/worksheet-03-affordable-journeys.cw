Border ["sussex", "kent"]
Border ["sussex", "surrey"]
Border ["surrey", "kent"]
Border ["hampshire", "sussex"]
Border ["hampshire", "surrey"]
Border ["hampshire", "berkshire"]
Border ["berkshire", "surrey"]
Border ["wiltshire", "hampshire"]
Border ["wiltshire", "berkshire"]

Adjacent [x, y]
---------------- border {
  Border [x, y]
}

Adjacent [x, y]
---------------- symmetry {
  Border [y, x]
}

Affordable [x, y]
-------------------- {
  Adjacent [x, y]
  // Adjacent [x, z]
  // Adjacent [z, y]
}

query (to_kent) {
  Affordable [to_kent, "kent"]
}

query (to_sussex) {
  Affordable ["sussex", to_sussex]
}

query (x, y) {
  Affordable [x, y]
}
