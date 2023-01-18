let weather = hyperrule {
  [SunRain()] => [Sun(), Rain()]
  [Rain(), Car()] => [Rain(), InCar()]
  [Rain()] => [WearUmbrella()]
  [Sun()] => [WearSunGlasses(), Cool()]
}

print weather(quote [SunRain()])
print weather(quote [SunRain(), Car()])
