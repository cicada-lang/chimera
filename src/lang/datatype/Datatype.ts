import type { Goal } from "../goal"

export type Datatype = {
  datactors: Array<Datactor>
}

export function Datatype(datactors: Array<Datactor>): Datatype {
  return {
    datactors,
  }
}

export type Datactor = {
  name: string
  args: Array<string>
  goals: Array<Goal>
}

export function Datactor(
  name: string,
  args: Array<string>,
  goals: Array<Goal>,
): Datactor {
  return {
    name,
    args,
    goals,
  }
}
