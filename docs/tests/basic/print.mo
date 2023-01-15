// json

print 1
print "a"
print ["a", "b", "c"]
print { a: 1, b: 2, c: 3 }

// primitive and curried

print stringAppend
print stringAppend("abc")

// function

print () => {}
print (x) => x

// curried function

function f(x, y) {
  return [x, y]
}

print f
print f(1)
