let weather = hyperrule {
  [SunRain()] => quote [Sun(), Rain()]
  [Rain(), Car()] => quote [Rain(), InCar()]
  [Rain()] => quote [WearUmbrella()]
  [Sun()] => quote [WearSunGlasses(), Cool()]
}

print weather(quote [SunRain()])
print weather(quote [SunRain(), Car()])
