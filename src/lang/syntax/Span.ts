export type Span = {
  lo: number
  hi: number
}

export function spanShift(span: Span, offset: number): Span {
  return {
    lo: span.lo + offset,
    hi: span.hi + offset,
  }
}
