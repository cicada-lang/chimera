let variableCount = 0

export function freshen(name: string): string {
  const [prefix, _count] = name.split("#")
  return `${prefix}#${variableCount++}`
}
