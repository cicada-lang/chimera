hyperrule weather {
  [SunRain()] => quote [Sun(), Rain()]
  [Rain(), Car()] => quote [Rain(), InCar()]
  [Rain()] => quote [WearUmbrella()]
  [Sun()] => quote [WearSunGlasses(), Cool()]
}

print hyperrewrite(weather, quote [SunRain()])
print hyperrewrite(weather, quote [SunRain(), Car()])
