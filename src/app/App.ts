import * as Loggers from "../framework/loggers"
import { AppConfig } from "./AppConfig"

export class App {
  logger = new Loggers.PrettyLogger()
  config = new AppConfig()
}
