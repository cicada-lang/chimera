import type { Span } from "./Span.js"

export type Token = {
  label: string
  value: string
  span: Span
}
