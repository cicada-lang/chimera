import * as Example from "./example.mo"

let { Hi, Hello } = Example

print find q {
  Hi(q)
}

print find q {
  Hello(q)
}
