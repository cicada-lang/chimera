export function deleteUndefined(exp: any) {
  return JSON.parse(JSON.stringify(exp))
}
