print find _ {
  Equal(x, [x])
}

print find _ {
  Equal(x, { x })
}

print find _ {
  Equal(x, { y: x })
}
