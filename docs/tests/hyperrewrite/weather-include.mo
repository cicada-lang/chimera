hyperrule rain {
  [Rain(), Car()] => quote [Rain(), InCar()]
  [Rain()] => quote [WearUmbrella()]
}

hyperrule sun {
  [Sun()] => quote [WearSunGlasses(), Cool()]
}

hyperrule weather {
  [SunRain()] => quote [Sun(), Rain()]
  include rain
  include sun
}

print hyperrewrite(weather, quote [SunRain()])
print hyperrewrite(weather, quote [SunRain(), Car()])
