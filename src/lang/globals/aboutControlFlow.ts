import type { GlobalStore } from "./GlobalStore"

export async function aboutControlFlow(globals: GlobalStore): Promise<void> {
  await globals.code(`

function if(target, thenFn, elseFn) {
  if target {
    return thenFn()
  } else {
    return elseFn()
  }
}

`)
}
