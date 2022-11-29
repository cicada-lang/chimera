import { Loggers } from "@cicada-lang/framework"
import { AppConfig } from "./AppConfig.ts"

export class App {
  logger = new Loggers.PrettyLogger()
  config = new AppConfig()
}
