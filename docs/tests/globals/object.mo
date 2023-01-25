assert isObject({})
assert isObject({ x: 1, y: 2, z: 3 })
assert not isObject(null)
assert not isObject([])
