import { App } from "./App.ts"

declare global {
  var app: App
}

export const app = new App()

globalThis.app = app
