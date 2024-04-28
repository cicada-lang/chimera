print () => {
  return 1
}

print (x) => {
  let y = x
  return y
}

// id

let id = (x) => {
  let y = x
  return y
}

print id(1)
print id(id(1))
print id(id(id(1)))

// zero arity

let one = () => {
  return 1
}

print one()
