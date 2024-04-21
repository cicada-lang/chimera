import * as Loggers from "@cicada-lang/framework/lib/loggers"
import { AppConfig } from "./AppConfig"
import { AppHome } from "./AppHome"

export class App {
  logger = new Loggers.PrettyLogger()
  config = new AppConfig()
  home = new AppHome()
}
