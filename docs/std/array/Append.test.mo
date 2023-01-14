import { Append } from "Append.mo"

print find [x, y] limit 6 {
  Append(x, y, [1, 2, 3, 4, 5])
}
