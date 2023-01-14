clause LtEqThree(n)
-------------- {
  n != add1(add1(add1(zero())))
}

print find n {
  LtEqThree(n)
}

print find _ {
  LtEqThree(zero())
}

print find _ {
  LtEqThree(add1(zero()))
}

print find _ {
  LtEqThree(add1(add1(zero())))
}

print find _ {
  LtEqThree(add1(add1(add1(zero()))))
}
