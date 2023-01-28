hyperrule Rain {
  [Rain(), Car()] => quote [Rain(), InCar()]
  [Rain()] => quote [WearUmbrella()]
}

hyperrule Sun {
  [Sun()] => quote [WearSunGlasses(), Cool()]
}

hyperrule Weather {
  [SunRain()] => quote [Sun(), Rain()]
  include Rain
  include Sun
}

print hyperrewrite(Weather, quote [SunRain()])
print hyperrewrite(Weather, quote [SunRain(), Car()])
