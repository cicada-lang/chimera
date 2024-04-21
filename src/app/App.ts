import * as Loggers from "@cicada-lang/framework/lib/loggers"
import { AppConfig } from "./AppConfig.js"

export class App {
  logger = new Loggers.PrettyLogger()
  config = new AppConfig()
}
