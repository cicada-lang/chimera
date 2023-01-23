hyperrule weather {
  [SunRain(x)] => quote [Sun(x), Rain(x)]
  [Rain(x), Car()] => quote [Rain(x), InCar()]
  [Rain(x)] if equal(x, 10) => quote [WearUmbrella(), Flood()]
  [Rain(_x)] => quote [WearUmbrella()]
  [Sun(_x)] => quote [WearSunGlasses(), Cool()]
}

print weather(quote [SunRain(3)])
print weather(quote [SunRain(3), Car()])

print weather(quote [SunRain(10)])
print weather(quote [SunRain(10), Car()])
