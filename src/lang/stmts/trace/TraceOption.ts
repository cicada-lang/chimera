export type TraceOption = TraceOptionSteps

export type TraceOptionSteps = {
  "@kind": "TraceOptionSteps"
  value: number
}

export function TraceOptionSteps(value: number): TraceOptionSteps {
  return {
    "@kind": "TraceOptionSteps",
    value,
  }
}
