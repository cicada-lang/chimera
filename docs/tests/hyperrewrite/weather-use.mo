hyperrule rain {
  [Rain(), Car()] => [Rain(), InCar()]
  [Rain()] => [WearUmbrella()]
}

hyperrule sun {
  [Sun()] => [WearSunGlasses(), Cool()]
}

hyperrule weather {
  [SunRain()] => [Sun(), Rain()]
  use rain
  use sun
}

print weather(quote [SunRain()])
print weather(quote [SunRain(), Car()])
