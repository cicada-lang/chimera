hyperrule Weather {
  [SunRain()] => quote [Sun(), Rain()]
  [Rain(), Car()] => quote [Rain(), InCar()]
  [Rain()] => quote [WearUmbrella()]
  [Sun()] => quote [WearSunGlasses(), Cool()]
}

print hyperrewrite(Weather, quote [SunRain()])
print hyperrewrite(Weather, quote [SunRain(), Car()])
