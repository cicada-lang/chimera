hyperrule weather {
  [SunRain(x)] => [Sun(x), Rain(x)]
  [Rain(x), Car()] => [Rain(x), InCar()]
  [Rain(x)] if Equal(x, 10) => [WearUmbrella(), Flood()]
  [Rain(_x)] => [WearUmbrella()]
  [Sun(_x)] => [WearSunGlasses(), Cool()]
}

print weather(quote [SunRain(3)])
print weather(quote [SunRain(3), Car()])

print weather(quote [SunRain(10)])
print weather(quote [SunRain(10), Car()])
